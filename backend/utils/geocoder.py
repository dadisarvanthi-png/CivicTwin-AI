from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="civictwin_ai")


def get_coordinates(location):

    try:

        place = geolocator.geocode(
            location,
            timeout=10
        )

        if place:

            return (
                place.latitude,
                place.longitude,
            )

        return None, None

    except Exception as e:

        print("Geocoder Error:", e)

        return None, None