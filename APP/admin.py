from django.contrib import admin
from .models import customers, Lab_result, Appointment,Medication, Staff, Status, Admission, feedback,Payments,Accepted_appointment,Rejected_appointment
# Register your models here.
admin.site.register(customers)
admin.site.register(Lab_result)
admin.site.register(Appointment)
admin.site.register(Medication)
admin.site.register(Staff)
admin.site.register(Status)
admin.site.register(Admission)
admin.site.register(feedback)
admin.site.register(Payments)
admin.site.register(Accepted_appointment)
admin.site.register(Rejected_appointment)
#admin.site.register(CustomModel)


