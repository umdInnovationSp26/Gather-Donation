from rest_framework import generics, permissions, filters
from rest_framework.exceptions import PermissionDenied

from .models import Category, DonationItem, DonationRequest, DonationMatch
from .serializers import (
    CategorySerializer,
    DonationItemSerializer,
    DonationRequestSerializer,
    DonationMatchSerializer,
)


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
