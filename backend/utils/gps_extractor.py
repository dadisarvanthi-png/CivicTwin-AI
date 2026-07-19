from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS


def convert_to_decimal(coords, ref):

    degrees = float(coords[0])

    minutes = float(coords[1])

    seconds = float(coords[2])

    decimal = (
        degrees +
        (minutes / 60) +
        (seconds / 3600)
    )

    if ref in ["S", "W"]:
        decimal *= -1

    return decimal


def get_gps(image_path):

    try:

        image = Image.open(image_path)

        exif = image._getexif()

        if exif is None:
            return None, None

        gps_info = {}

        for key, value in exif.items():

            decoded = TAGS.get(key)

            if decoded == "GPSInfo":

                for gps_key in value:

                    gps_info[
                        GPSTAGS.get(gps_key)
                    ] = value[gps_key]

        if "GPSLatitude" not in gps_info:
            return None, None

        latitude = convert_to_decimal(
            gps_info["GPSLatitude"],
            gps_info["GPSLatitudeRef"],
        )

        longitude = convert_to_decimal(
            gps_info["GPSLongitude"],
            gps_info["GPSLongitudeRef"],
        )

        return (
            latitude,
            longitude,
        )

    except Exception as e:

        print("GPS Error:", e)

        return None, None