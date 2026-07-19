HIGH = [
    "accident",
    "fire",
    "death",
    "electric",
    "electricity",
    "hospital",
    "crime",
    "flood",
    "collapsed",
    "danger",
]

MEDIUM = [
    "garbage",
    "drainage",
    "water",
    "streetlight",
    "road",
    "traffic",
    "signal",
]

LOW = [
    "park",
    "painting",
    "clean",
    "dust",
    "tree",
]


def predict_priority(description):

    text = description.lower()

    for word in HIGH:

        if word in text:
            return "High"

    for word in MEDIUM:

        if word in text:
            return "Medium"

    for word in LOW:

        if word in text:
            return "Low"

    return "Medium"