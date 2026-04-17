"""
Management command to seed the database with sample donation items.

Usage:
    python manage.py seed_donations
    python manage.py seed_donations --clear   # wipe existing items first
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from donations.models import Category, DonationItem

User = get_user_model()

CATEGORIES = [
    {"name": "Furniture",    "icon": "chair"},
    {"name": "Clothing",     "icon": "shirt"},
    {"name": "Kitchen",      "icon": "utensils"},
    {"name": "Cleaning",     "icon": "spray-can"},
    {"name": "Electronics",  "icon": "laptop"},
    {"name": "Books",        "icon": "book"},
    {"name": "Toys",         "icon": "puzzle-piece"},
]

ITEMS = [
    {
        "title": "Leather Sofa",
        "category": "Furniture",
        "condition": "good",
        "location": "Minneapolis, MN",
        "description": "Gently used 3-seater leather sofa in great condition. No tears or stains. Pick-up only.",
    },
    {
        "title": "Winter Jacket (M)",
        "category": "Clothing",
        "condition": "like_new",
        "location": "Saint Paul, MN",
        "description": "Warm winter jacket, size medium. Worn only one season. Perfect for cold weather.",
    },
    {
        "title": "KitchenAid Stand Mixer",
        "category": "Kitchen",
        "condition": "good",
        "location": "Duluth, MN",
        "description": "KitchenAid stand mixer, 5 qt. All attachments included. Works perfectly.",
    },
    {
        "title": "All-Purpose Cleaner Set",
        "category": "Cleaning",
        "condition": "new",
        "location": "Minneapolis, MN",
        "description": "Bundle of unopened cleaning supplies — spray bottles, wipes, and detergent.",
    },
    {
        "title": "Wooden Bookshelf",
        "category": "Furniture",
        "condition": "fair",
        "location": "Bloomington, MN",
        "description": "Solid wood 5-shelf bookcase. Minor scratches on the side, otherwise solid.",
    },
    {
        "title": "Kids' Clothes Bundle",
        "category": "Clothing",
        "condition": "good",
        "location": "Edina, MN",
        "description": "Assorted kids clothes, ages 4–6. Mix of shirts, pants, and light jackets.",
    },
    {
        "title": "Cast Iron Skillet",
        "category": "Kitchen",
        "condition": "good",
        "location": "Saint Paul, MN",
        "description": "Well-seasoned 12-inch cast iron skillet. Ready to use, just needs a rinse.",
    },
    {
        "title": "Vacuum Cleaner",
        "category": "Cleaning",
        "condition": "like_new",
        "location": "Minneapolis, MN",
        "description": "Dyson V7 cordless vacuum. Works great. Includes all heads and charger.",
    },
    {
        "title": "Coffee Table",
        "category": "Furniture",
        "condition": "good",
        "location": "Richfield, MN",
        "description": "Modern walnut coffee table, 48\"x24\". Light use, no damage.",
    },
]


class Command(BaseCommand):
    help = "Seed the database with sample categories and donation items."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete existing donation items before seeding.",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            DonationItem.objects.all().delete()
            self.stdout.write(self.style.WARNING("Cleared existing donation items."))

        # Get or create a seed donor account
        donor, created = User.objects.get_or_create(
            email="seed@gather.local",
            defaults={
                "username": "seed_donor",
                "first_name": "Gather",
                "last_name": "Demo",
                "location": "Minneapolis, MN",
            },
        )
        if created:
            donor.set_password("seed1234!")
            donor.save()
            self.stdout.write(self.style.SUCCESS("Created seed donor: seed@gather.local"))

        # Create categories
        category_map = {}
        for cat_data in CATEGORIES:
            cat, _ = Category.objects.get_or_create(
                name=cat_data["name"], defaults={"icon": cat_data["icon"]}
            )
            category_map[cat.name] = cat

        # Create donation items
        created_count = 0
        for item_data in ITEMS:
            category = category_map.get(item_data["category"])
            _, created = DonationItem.objects.get_or_create(
                title=item_data["title"],
                donor=donor,
                defaults={
                    "description": item_data["description"],
                    "category": category,
                    "condition": item_data["condition"],
                    "location": item_data["location"],
                    "status": "available",
                },
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {created_count} donation items and {len(CATEGORIES)} categories."
            )
        )
