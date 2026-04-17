from django.urls import path
from .views import (
    CategoryListView,
    DonationItemListCreateView,
    DonationItemDetailView,
    DonationRequestListCreateView,
    DonationRequestDetailView,
    DonationMatchListCreateView,
    DonationMatchDetailView,
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('items/', DonationItemListCreateView.as_view(), name='item-list'),
    path('items/<int:pk>/', DonationItemDetailView.as_view(), name='item-detail'),
    path('requests/', DonationRequestListCreateView.as_view(), name='request-list'),
    path('requests/<int:pk>/', DonationRequestDetailView.as_view(), name='request-detail'),
    path('matches/', DonationMatchListCreateView.as_view(), name='match-list'),
    path('matches/<int:pk>/', DonationMatchDetailView.as_view(), name='match-detail'),
]
