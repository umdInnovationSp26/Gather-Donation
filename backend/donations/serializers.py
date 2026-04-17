from rest_framework import serializers
from .models import Category, DonationItem, DonationRequest, DonationMatch


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon']


class DonationItemSerializer(serializers.ModelSerializer):
    donor_name = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = DonationItem
        fields = [
            'id', 'donor', 'donor_name', 'title', 'description',
            'category', 'category_name', 'condition', 'location',
            'status', 'image', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'donor', 'created_at', 'updated_at']

    def get_donor_name(self, obj):
        return f'{obj.donor.first_name} {obj.donor.last_name}'.strip() or obj.donor.email

    def create(self, validated_data):
        validated_data['donor'] = self.context['request'].user
        return super().create(validated_data)


class DonationRequestSerializer(serializers.ModelSerializer):
    requester_name = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = DonationRequest
        fields = [
            'id', 'requester', 'requester_name', 'title', 'description',
            'category', 'category_name', 'urgency', 'location',
            'status', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'requester', 'created_at', 'updated_at']

    def get_requester_name(self, obj):
        return f'{obj.requester.first_name} {obj.requester.last_name}'.strip() or obj.requester.email

    def create(self, validated_data):
        validated_data['requester'] = self.context['request'].user
        return super().create(validated_data)


class DonationMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationMatch
        fields = [
            'id', 'donation_item', 'donation_request', 'status',
            'matched_by', 'notes', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'matched_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['matched_by'] = self.context['request'].user
        return super().create(validated_data)
