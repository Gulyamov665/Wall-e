from rest_framework.routers import DefaultRouter
from checklist.views.brand_view import BrandView
from checklist.views.product_view import ProductView
from checklist.views.checklist_view import ChecklistView

router = DefaultRouter()

router = DefaultRouter()
router.register(r"brand", BrandView, basename="brand")
router.register(r"product", ProductView, basename="product")
router.register(r"checklist", ChecklistView, basename="checklist")




urlpatterns = router.urls