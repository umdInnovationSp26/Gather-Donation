from django.contrib import admin
from .models import Category, DonationItem, DonationRequest, DonationMatch


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'icon']
    search_fields = ['name']


@admin.register(DonationItem)
class DonationItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'donor', 'category', 'condition', 'status', 'created_at']
    list_filter = ['status', 'condition', 'category']
    search_fields = ['title', 'description', 'donor__email']


@admin.register(DonationRequest)
class DonationRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'requester', 'category', 'urgency', 'status', 'created_at']
    list_filter = ['status', 'urgency', 'category']
    search_fields = ['title', 'description', 'requester__email']


@admin.register(DonationMatch)
class DonationMatchAdmin(admin.ModelAdmin):
    list_display = ['id', 'donation_item', 'donation_request', 'status', 'created_at']
    list_filter = ['status']
