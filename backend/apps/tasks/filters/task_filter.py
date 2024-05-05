from django_filters import rest_framework as filters
from tasks.models import Task
from tasks.models import Classification
from users.models import UserModel 


class TaskFilter(filters.FilterSet):
    start_time = filters.DateTimeFromToRangeFilter()
    classification = filters.ModelChoiceFilter(queryset=Classification.objects.all())
    executor = filters.ModelChoiceFilter(queryset=UserModel.objects.all())

    class Meta:
        model = Task
        fields = ["classification", "status", "start_time", "executor"]