from rest_framework.throttling import AnonRateThrottle


class ObjectThrottle(AnonRateThrottle):
    rate = "1000/m"


class ObjectAnonThrottle(AnonRateThrottle):
    rate = "1/s"
