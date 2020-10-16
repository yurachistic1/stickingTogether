from django.db import models


def image_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/<cause>/<filename>
    return "{0}/{1}".format(instance.cause, filename)


def image_directory_path2(instance, filename):
    # file will be uploaded to MEDIA_ROOT/<cause>/<filename>
    return "{0}/{1}".format(instance.sticker.cause, filename)


# Create your models here.


class Sticker(models.Model):

    BEIRUTREDCROSS = "BRC"
    CAUSES_CHOICES = [
        (BEIRUTREDCROSS, "Beirut Red Cross"),
    ]

    name = models.CharField(max_length=30, unique=True)
    price = models.FloatField(verbose_name="Price (£)")
    price_sg = models.FloatField(verbose_name="Price (S$)")
    description = models.TextField(default="", blank=True)
    dimensions = models.CharField(
        verbose_name="Dimensions (A x B cm)", null=True, max_length=10
    )
    artist = models.CharField(max_length=30)
    singapore_stock = models.IntegerField()
    uk_stock = models.IntegerField()
    cause = models.CharField(max_length=5, choices=CAUSES_CHOICES)
    image_1 = models.ImageField(
        verbose_name="Primary Image",
        upload_to=image_directory_path,
        null=True,
        blank=True,
    )

    image_2 = models.ImageField(
        verbose_name="Secondary Image",
        upload_to=image_directory_path,
        null=True,
        blank=True,
    )

    ordering = models.IntegerField(
        verbose_name="Order of appearance(lowest first)", default=1
    )

    def __str__(self):
        return self.name + "-ordering: " + str(self.ordering)

    class Meta:
        ordering = ["ordering"]


class StickerImage(models.Model):
    text_description = models.CharField(max_length=100)
    image = models.ImageField(upload_to=image_directory_path2)
    sticker = models.ForeignKey(Sticker, on_delete=models.CASCADE)

    def __str__(self):
        return self.text_description + str(self.id)