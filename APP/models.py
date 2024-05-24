from django.db import models
from django.utils import timezone
#from django.contrib.auth.models import AbstractUser
import datetime
# Create your models here.
class customer(models.Model):
     username= models.CharField(max_length=50) 
     email = models.EmailField(max_length=50) 
     password= models.CharField(max_length=20)
     
class customers(models.Model):
    reg_name = models.CharField(max_length=100)
    id_number = models.IntegerField(null=False, blank=True)
    name = models.CharField(max_length=100)
    dof = models.DateField(null=False, blank=True)
    age = models.IntegerField(null=False, blank=True)
    weight = models.FloatField(null=False, blank=True)
    file_number = models.IntegerField(null=False, blank=True)
    role = models.CharField(max_length=150)
    marital_status = models.CharField(max_length=100)
    sex = models.CharField(max_length=50)
    date_created = models.DateField(null=False,default=timezone.now)
    height = models.IntegerField()
    ward = models.CharField(max_length=100, blank=True)
    day= models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    street_chairman = models.CharField(max_length=100, blank=True, null=True)
    ten_cell_leader = models.CharField(max_length=100, null=True, blank=True)
    street_chair_man_contact = models.IntegerField(null=True, blank=True)
    client_contact = models.IntegerField()    
        
class Lab_result(models.Model):
     sample_date = models.DateField(default=timezone.now)
     sample_date_returned = models.DateField(default=timezone.now)
     result_date = models.DateField(default=timezone.now)
     copies = models.IntegerField()
     eac_start_date = models.DateField(default=timezone.now)
     eac_end_date = models.DateField(default=timezone.now)
     date_second_test = models.DateField(default=timezone.now)
     vital_name = models.TextField(blank=True, null=False, max_length=100)
     date_taken = models.DateField()
     rate = models.FloatField() 
     
class Appointment(models.Model):
     patient_number = models.IntegerField()
     name = models.CharField(max_length=50)
     age = models.IntegerField(null=False)
     gender = models.CharField(max_length=20)
     marital = models.CharField(max_length=50)
     address = models.CharField(max_length=200)
     phone = models.IntegerField()
     category = models.CharField(max_length=200)
     consultant_name = models.CharField(max_length=100)
     consultant_contacts = models.IntegerField(null=True, blank=True)
     date = models.DateField(default=timezone.now)
     start_date = models.TimeField()
     end_date = models.TimeField()
     
class Medication(models.Model):
        file_number = models.IntegerField()
        id_number = models.IntegerField()
        name = models.CharField(max_length=100)
        dof = models.DateField()
        age = models.IntegerField()
        weight = models.FloatField()
        date = models.DateField(default=timezone.now)
        case_description = models.TextField(max_length=500)
        description = models.TextField(max_length=500)
        full_name = models.CharField(max_length=100)
        start_date = models.DateField()
        end_date = models.DateField()
        date_new = models.DateField()
        weight_new = models.FloatField()
        case_new = models.CharField(max_length=200)
        case_description_new = models.TextField()
        full_name_new = models.CharField(max_length=100)
        description_new = models.TextField()
        start_date_new = models.DateField()
        end_date_new = models.DateField()     

class Staff(models.Model):
     name = models.CharField(max_length=100)
     email= models.EmailField()
     age = models.IntegerField()
     gender = models.CharField(max_length=100)
     marital = models.CharField(max_length=100)
     phone = models.IntegerField()
     address = models.CharField(max_length=200)
     training = models.TextField(max_length=255, default="college training")
     experience = models.TextField(max_length=300, default=" ")
     role = models.CharField(max_length=200, default="doctor")
     specialty = models.CharField(max_length=200)
     
class Status(models.Model):
     accept = models.CharField(max_length=100)     
     reject = models.CharField(max_length=100)     


class Admission(models.Model):
     file_number = models.IntegerField(null=True)
     name = models.CharField(max_length=100, blank=True)
     id_number = models.IntegerField(null=True)
     dof = models.TextField(null=True)
     weight = models.FloatField(null=True)
     day = models.CharField(max_length=255, blank=True)
     date = models.TextField(null=True)
     case_description = models.TextField(null=True)
     full_name_new = models.TextField(null=True)
     description_new = models.TextField(null=True)
     start_date = models.TextField(null=True)
     end_date = models.TextField(null=True)
     visit_date = models.TextField(null=False)
     visit_case = models.TextField(null=False, default="Body Checkup")
     case_description_new = models.TextField(null=True)
     doctor_name = models.CharField(max_length=200)
     visit_time = models.TimeField(null=True)
     phone = models.IntegerField()
     
class feedback(models.Model):
     name = models.CharField(max_length=200)
     email = models.EmailField(max_length=100)
     subject = models.CharField(max_length=100)
     date = models.DateField(auto_now_add=True)
     message = models.TextField(max_length=300)
     contacts = models.IntegerField()
          
     