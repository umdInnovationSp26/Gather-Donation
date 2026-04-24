from rest_framework import generics, permissions, filters
from rest_framework.exceptions import PermissionDenied

from .models import Category, DonationItem, DonationRequest, DonationMatch
from .serializers import (
    CategorySerializer,
    DonationItemSerializer,
    DonationRequestSerializer,
    DonationMatchSerializer,
)
#-- RECEIPT --
from .utils import generate_receipt_pdf 
from django.utils import timezone


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Allow full access to the owner; everyone else gets read-only."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        owner_field = getattr(obj, 'donor', None) or getattr(obj, 'requester', None)
        return owner_field == request.user


# --- Categories ---

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Donation Items ---

class DonationItemListCreateView(generics.ListCreateAPIView):
    queryset = DonationItem.objects.select_related('donor', 'category').order_by('-created_at')
    serializer_class = DonationItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location', 'category__name']
    ordering_fields = ['created_at', 'condition', 'status']

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        status = self.request.query_params.get('status')
        if category:
            qs = qs.filter(category__id=category)
        if status:
            qs = qs.filter(status=status)
        return qs
    
    #---rECEIPT Generation ---
    def perform_create(self, serializer):
        # 1. Save the donation item normally
        donation_item = serializer.save(donor=self.request.user)

        # 2. Check the flags sent from your Angular frontend
        generate_receipt = self.request.data.get('generate_receipt') == 'true'
        item_value = self.request.data.get('item_value')

        if generate_receipt:
            # 3. Prepare data for the PDF template
            context = {
                'item_name': donation_item.title,
                'value': item_value,
                'donor_name': self.request.user.get_full_name() or self.request.user.username,
                'date': timezone.now().strftime('%B %d, %Y'),
                'receipt_id': f"BEN-{donation_item.id}-{timezone.now().year}"
            }

            # 4. Call the utility to get the PDF bytes
            pdf_content = generate_receipt_pdf(context)

            if pdf_content:
                # 5. Save the PDF to the model (Assumes you have a receipt_pdf field)
                # If you don't have the field yet, you can skip saving and just return the PDF
                filename = f"receipt_{donation_item.id}.pdf"
                donation_item.receipt_pdf.save(filename, ContentFile(pdf_content))
                donation_item.save()


class DonationItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DonationItem.objects.select_related('donor', 'category')
    serializer_class = DonationItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# --- Donation Requests ---

class DonationRequestListCreateView(generics.ListCreateAPIView):
    queryset = DonationRequest.objects.select_related('requester', 'category').order_by('-created_at')
    serializer_class = DonationRequestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location', 'category__name']
    ordering_fields = ['created_at', 'urgency', 'status']

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        urgency = self.request.query_params.get('urgency')
        status = self.request.query_params.get('status')
        if category:
            qs = qs.filter(category__id=category)
        if urgency:
            qs = qs.filter(urgency=urgency)
        if status:
            qs = qs.filter(status=status)
        return qs


class DonationRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DonationRequest.objects.select_related('requester', 'category')
    serializer_class = DonationRequestSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


# --- Matches ---

class DonationMatchListCreateView(generics.ListCreateAPIView):
    queryset = DonationMatch.objects.select_related(
        'donation_item', 'donation_request', 'matched_by'
    ).order_by('-created_at')
    serializer_class = DonationMatchSerializer
    permission_classes = [permissions.IsAuthenticated]


class DonationMatchDetailView(generics.RetrieveUpdateAPIView):
    queryset = DonationMatch.objects.all()
    serializer_class = DonationMatchSerializer
    permission_classes = [permissions.IsAuthenticated]
