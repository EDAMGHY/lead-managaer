from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer


# Lead View
class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes=[
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.leads.all() 
    
    def perform_create(self,serializer):
        serializer.save(owner=self.request.user)
        
