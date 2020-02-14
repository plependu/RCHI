from backend.api.Backend2020.models import *
from rest_framework import serializers

class HouseholdsByCityYearInterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseholdsByCityYearInterview2020
        fields = '__all__'

class SubpopulationsByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByCity2020
        fields = '__all__'

class SubpopulationsByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubpopulationsByYear2020
        fields = '__all__'

class VolunteerDeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerDeployment2020
        fields = '__all__'

class CityTotalsByYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityTotalsByYear2020
        fields = '__all__'

class GeneralTableSubpopulationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTableSubpopulations2020
        fields = '__all__'

class GeneralTableSubpopulationsShelteredSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTableSubpopulationsSheltered2020
        fields = '__all__'