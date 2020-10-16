from django.contrib import admin

# Register your models here.
from .models import Sticker, StickerImage

admin.site.register(Sticker)
admin.site.register(StickerImage)