from django_filters import rest_framework as filters
from tasks.models import Task, TaskComments


class CommentFilter(filters.FilterSet):
    task = filters.ModelChoiceFilter(queryset=Task.objects.all())

    class Meta:
        model = TaskComments
        fields = ["task"]