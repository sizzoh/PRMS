import datetime
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.urls import reverse
from .models import customers, Lab_result, Appointment, Medication, Staff, Status, Admission,feedback
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.core import serializers
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from django.db.models import Q
#from datetime import timezone
from django.utils import timezone
import json
# Create your views here.
def index(request):
    return render(request, 'login.html')

@login_required(login_url="index")
def home(request):
    app = Appointment.objects.all()
    current_date = datetime.datetime.now()
    current_patient = customers.objects.filter(date_created=current_date).count()
    return render(request, 'home.html', {'app': app,"data":current_patient})

@login_required(login_url="index")
def demographic(request):
    return render(request, 'demographics.html')


@login_required(login_url="index")
def reception(request):
    if "number" in request.GET:
        number = request.GET["number"]
        attended = customers.objects.filter(file_number__icontains=number)
    elif "name" in request.GET:
         name = request.GET["name"]
         attended = customers.objects.filter(name__icontains=name)
    elif "phone" in request.GET:
        phone = request.GET["phone"]
        attended = customers.objects.filter(client_contact__icontains=phone)
    elif "visit_date" in request.GET:
        date = request.GET["visit_date"]
        attended = customers.objects.filter(date_created__iexact=date)    
    else:
        attended = customers.objects.all()          
    context = {
        "attended": attended,
    }    
    return render(request, 'reception.html',context)

def login(request):
    if request.method=='POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username == "" or password == "":
            messages.info(request, 'Please enter a username and password to login')
            return redirect('login')
            
        else:
            if len(password) < 8:
                messages.info(request, 'password must contain at least 8 characters')
                return redirect('login') 
            else:
                user = auth.authenticate(username=username, password=password)
                if user is not None:
                    auth.login(request, user)
                    return redirect('home')
                else:
                    messages.info(request, 'invalid credentials')
    return render(request, 'login.html')

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email=request.POST['email']
        password = request.POST['password']
        password_confirmation = request.POST['password_confirmation']
        
        
        if User.objects.filter(username=username).exists():
            messages.info(request, 'Username already registered')
            return redirect('register')
        elif  User.objects.filter(email=email).exists():
                messages.info(request, ' email already taken')
                return redirect('register')
        elif  password != password_confirmation:
                    messages.info(request, ' password do not match')
                    return redirect('register')
        elif len(password) < 8:
            messages.info(request, 'password must contain at least 8 characters')  
            return redirect('register')      
        else:
            user = User.objects.create(username=username, email=email, password=password)
            user.save() 
            return redirect('login')       
    return render(request, 'user_register.html')
def logout(request):
    auth.logout(request)
    return redirect('login')

@login_required(login_url="index")   
def customer(request):
    if request.method == 'POST':
        reg_name = request.POST['reg_name']
        id_number = request.POST['id_number']
        full_name = request.POST['full_name']
        dof = request.POST['dof']
        age = request.POST['age']
        weight = request.POST['weight']
        file_number = request.POST['file_number']
        role = request.POST['role']
        marital_status = request.POST['marital_status']
        sex = request.POST['sex']
        date_created = request.POST['date_created']
        height = request.POST['height']
        ward = request.POST['ward']
        street = request.POST['street']
        visit_day = request.POST['day']
        street_chairman = request.POST['street_chairman']
        ten_cell_leader = request.POST['ten_cell_leader']
        street_chair_man_contact = request.POST['street_chair_man_contact']
        client_contact = request.POST['client_contact']
        client = customers(reg_name=reg_name,id_number=id_number,
        name=full_name,dof=dof,age=age,weight=weight,height=height,
        file_number=file_number,role=role,marital_status=marital_status,day=visit_day,
        sex=sex, date_created=date_created, ward=ward, street=street, street_chair_man_contact=street_chair_man_contact,
        street_chairman=street_chairman,ten_cell_leader= ten_cell_leader,client_contact=client_contact )
        if(customers.objects.filter(file_number=file_number)):
            messages.warning(request, "File number Already exists") 
        else:     
            client.save()
    return render(request, 'register.html')

def edit_patient(request, pk):
    details = customers.objects.filter(id__exact=pk)
    context = {
        "data": details
    }
    return render(request, 'edit_patient.html',context)

def delete_patient(request,pk):
    data =  customers.objects.get(id=pk)


@login_required(login_url="index")
def prescription(request):
    #here i will call particular patient to prescribe medications 
    if request.method == 'GET':
        card_number = request.GET['card_number']
        id_number = request.GET['id_number']
        name = request.GET['name']
        dof = request.GET['dof']
        age = request.GET['age']
        weight = request.GET['weight']
        date = request.GET['date']
        case_description = request.GET['case_description']
        description = request.GET['description']
        full_name = request.GET['full_name']
        start_date = request.GET['start_date']
        end_date = request.GET['end_date']
        date_new = request.GET['date_new']
        weight_new = request.GET['weight_new']
        case_new = request.GET['case_new']
        case_description_new = request.GET['case_description_new']
        full_name_new = request.GET['full_name_new']
        description_new = request.GET['description_new']
        start_date_new = request.GET['start_date_new']
        end_date_new = request.GET['end_date_new']
        
        prescriptions = Medication(card_number=card_number,id_number=id_number,
        description=description,start_date=start_date,end_date=end_date,
        name=name,dof=dof,age=age,weight=weight,date=date,
        case_description=case_description,full_name=full_name,date_new=date_new,
        weight_new=weight_new,case_new=case_new,case_description_new=case_description_new,
        full_name_new=full_name_new,description_new=description_new,
        start_date_new=start_date_new,end_date_new=end_date_new) 
        prescriptions.save()
        
    return render(request, 'prescriptions.html')


@login_required(login_url="index")
def Test(request):
    if request.method == 'POST':
        sample_date = request.POST['sample_date']
        sample_date_returned = request.POST['sample_date_returned']
        result_date = request.POST['result_date']
        copies = request.POST['copies']
        eac_start_date = request.POST['eac_start_date']
        eac_end_date = request.POST['eac_end_date']
        date_second_test = request.POST['date_second_test']
        vital_name = request.POST['vital_name']
        date_taken = request.POST['date_taken']
        rate = request.POST['rate']
        
        result = Lab_result(sample_date= sample_date, sample_date_returned=sample_date_returned,
        result_date=result_date,copies=copies,eac_start_date=eac_start_date,
        eac_end_date=eac_end_date,date_second_test=date_second_test,vital_name=vital_name,
        date_taken=date_taken, rate=rate)
        result.save()
        
    return render(request, 'test_results.html')


@login_required(login_url="index")
def appointment(request, pk):
    app = Appointment.objects.filter(patient_number__iexact=pk)
    return render(request, 'appointment.html', {"appointment": app})


@login_required(login_url="index")
def Book_appointment(request):
    if request.method == 'POST':
        patient_number = request.POST['patient_number']
        name = request.POST['name']
        age = request.POST['age']
        gender = request.POST['gender']
        marital = request.POST['marital']
        address = request.POST['address']
        phone = request.POST['phone']
        category = request.POST['category']
        consultant_name = request.POST['consultant_name']
        consultant_contacts = request.POST['consultant_contacts']
        date = request.POST['date']
        start_date = request.POST['start_time']
        end_date = request.POST['end_time']
        
        appointments = Appointment(patient_number=patient_number, name=name, 
        age=age,gender=gender,marital=marital,address=address,phone=phone,
        category=category, consultant_name=consultant_name,
        consultant_contacts=consultant_contacts,start_date=start_date,end_date=end_date)
        appointments.save()
    return render(request, 'book_appointment.html')


@login_required(login_url="index")
def manage_appointment(request):
    appointment = Appointment.objects.all()
    context= {
        "book":appointment
    }
    return render(request, 'manage_appointment.html', context)


@login_required(login_url="index")
def medication(request):
    if "customer_number" in request.GET:
        attended = customers.objects.filter(file_number__icontains=request.GET["customer_number"])
    elif "patient_name" in request.GET:
         attended = customers.objects.filter(full_name__icontains=request.GET["patient_name"])
    elif "phone" in request.GET:
        attended = customers.objects.filter(client_contact__icontains=request.GET["patient_email"])
    else:
        attended = customers.objects.all()    
        admitted = Admission.objects.all()      
    context = {
        "attended": attended,
        "admitted": admitted, 
    }    
    return render(request, 'medication.html',context)


@login_required(login_url="index")
def medication_data(request):
    medication = Medication.objects.all()
    medic = list(medication)
    serializers.serialize('json', medication)
    context = {
       'medication_data': medication 
    }
    return JsonResponse(context)


@login_required(login_url="index")
def medicationQuery(request):
    medication = Medication.objects.all().values()
    querySet = list(medication)
    #querySet = serialize('json', medication)
    #data = json.loads(querySet)
    #json.dumps(context, sort_keys=True)
    context = {
        'data': querySet,
    }
    return JsonResponse(context, safe=False)


@login_required(login_url="index")
def appointmentList(request, pk):
    if "customer_number" in request.GET:
        app = Appointment.objects.filter(file_number__icontains=pk)
    elif "patient_name" in request.GET:
         app = Appointment.objects.filter(full_name__icontains=pk)
    elif "phone" in request.GET:
        app = Appointment.objects.filter(client_contact__icontains=pk)
    else:
        app = Appointment.objects.all()          
    context = {
        "attended": app,
    }    
    return render(request, 'appointment.html',context)


@login_required(login_url="index")
def doctor(request):
    if request.method == 'POST':
        name = request.POST['name']
        email= request.POST['email']
        age = request.POST['age']
        gender = request.POST['sex']
        marital = request.POST['marital']
        phone = request.POST['phone']
        address = request.POST['address']
        training = request.POST['training']
        experience =request.POST['experience']
        role = request.POST['role'] 
        specialty = request.POST['specialty']
        
        doc_db = Staff(name=name, email=email, age=age, gender=gender,
        marital=marital,phone=phone, address=address,training=training,
        experience=experience,role=role,specialty=specialty )
        if Staff.objects.filter(name=name).exists():
            messages.info(request, "This name %s already exists")
            return False
        elif Staff.objects.filter(email=email).exists():
            messages.info(request, "This email %s already exists")
            return False
        else:    
            doc_db.save()
    return render(request, 'doctors.html')


@login_required(login_url="index")
def RegDoc(request):
    customer = customers.objects.all()
    if "name" in request.GET:
        doc_name = request.GET['name']
        doc = Staff.objects.filter(Q(name__icontains=doc_name)|Q(phone__icontains=doc_name)|Q(email__icontains=doc_name))
    else:
        doc = Staff.objects.all()
    context = {'doc':doc,
               'customer':customer
              }   
    return render(request, 'registered_doctors.html', context)

def edit_staff(request,pk):
    staff_details = Staff.objects.filter(id__exact=pk)
    context = {'staff_details':staff_details}
    
    return render(request, 'edit_staff.html', context)

def delete_staff(request, pk):
    staff_data = Staff.objects.get(id=pk)
    staff_data.delete()
    
    return HttpResponseRedirect(reverse('RegDoc'))


@login_required(login_url="index")
def user_data(request):
    if 'name' in request.GET:
        username = request.GET['name']
        roles = ['admin', 'manager', 'customer', 'doctor', 'receptionist', 'accountant', '']
        patient_data = customers.objects.all()
        doctor_data = Staff.objects.all()
        for i in roles:
            patient_data.filter(Q(name__icontains=username)|Q(role__iexact=i))
            doctor_data.filter(Q(name__icontains=username)|Q(role__iexact=i))
            user = User.objects.filter(username__icontains=username)
                
        patient_queryset= serialize('json',patient_data)
        doctor_queryset = serialize('json',doctor_data)
        user_queryset= serialize('json',user)
        data1 = json.loads(patient_queryset)
        data2 = json.loads(doctor_queryset)
        data3 = json.loads(user_queryset)
        context = {
            'customer_data': data1,
            'staff_data': data2,
            'auth': data3
        }
        return JsonResponse(context, safe=False)


@login_required(login_url="index")
def prescriptions(request):
    return render(request, 'prescriptions.html')


@login_required(login_url="index")
def existing_prescriptions(request, pk):
    data = Medication.objects.filter(file_number__iexact=pk).values()
    data1 = customers.objects.filter(file_number__iexact=pk).values()
    context = {'data': data}
    context1 = {'data': data1}
    if  len(data)==0:
        print("no data provided")
        return render(request, 'prescriptions.html', context1)
    else:
        print(context, "empty data provided")
        return render(request, 'prescriptions.html', context)

def searchData(request):
    if "patient_number" in request.GET:
        number = request.GET["patient_number"]
        attended = customers.objects.filter(file_number__icontains=number)
        result = serialize("json", attended)
        data = json.loads(result)
        context = {
            "attended": data,
        }
        return JsonResponse(context, safe=False)
    elif "name" in request.GET:
        name = request.GET["name"]
        attended = customers.objects.filter(name__icontains=name)
        result = serialize("json", attended)
        data = json.loads(result)
        context = {
            "attended": data,
        }
        return JsonResponse(context, safe=False)
    elif "phone" in request.GET:
        phone = request.GET["phone"]
        attended = customers.objects.filter(client_contact__icontains=phone)
        result = serialize("json", attended)
        data = json.loads(result)
        context = {
            "attended": data,
        }
        return JsonResponse(context, safe=False)
    elif "visit_date" in request.GET:
        date = request.GET["visit_date"]
        attended = customers.objects.filter(date_created__iexact=date)
        result = serialize("json", attended)
        data = json.loads(result)
        context = {
            "attended": data,
        }
        return JsonResponse(context, safe=False)
    else:
        attended = customers.objects.all()
        result = serialize("json", attended)
        data = json.loads(result)
        context = {
        "attended": data,
        }
        return JsonResponse(context, safe=False)
    

def status(request):
    if "accept" in request.GET:
        accept = request.GET["accept"]
        status = Status.objects.filter(accept__iexact=accept)
        status_obj = serialize("json", status)
        accepted = json.loads(status_obj)
        context = {"status":accepted}
        
        return JsonResponse(context, safe=False)
    
    elif "reject" in request.GET:
        reject = request.GET["reject"]
        status = Status.objects.filter(reject__iexact=reject)
        status_obj = serialize("json", status)
        rejected = json.loads(status_obj)
        context = {"status": rejected}
        
        return JsonResponse(context, safe=False)
        
def  edit_appointment(request, pk):
    appointment = Appointment.objects.filter(id__iexact=pk)
    context = {'appointmentList': appointment}
    return render(request, 'edit_appointment.html', context)

def delete_appointment(request,pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.delete()
    return redirect('appointment')

def admit_patient(request,pk):
    existing_details = Medication.objects.filter(file_number__icontains=pk)
    person_info = customers.objects.filter(file_number__icontains=pk)
    
    context = {
        'data': existing_details,
        'person_info': person_info
    }
    return render(request, 'admit_patient.html', context)
    
def staff_specialty(request):
    if 'specialty' in request.GET:
        specialism = request.GET['specialty'] 
        staff_data = Staff.objects.filter(specialty__icontains=specialism)
        serialized = serialize("json",staff_data)
        data = json.loads(serialized)
        
        context = {
            'data_object':data
        }
        return JsonResponse(context, safe=False)
    
def admission(request):
    if request.method == 'POST':
        file_number = request.POST['file_number']
        name = request.POST['name']
        id_number = request.POST['id_number']
        dof = request.POST['dof']
        weight = request.POST['weight']
        day = request.POST['day']
        date = request.POST['date']
        case_description = request.POST['case_description']
        full_name_new = request.POST['full_name']
        description_new = request.POST['description']
        start_date = request.POST['start_date']
        end_date = request.POST['end_date']
        visit_date = request.POST['visit_date']
        visit_case = request.POST['visit_case']
        case_description_new = request.POST['case_description_new']
        doctor_name = request.POST['doctor_name']
        visit_time = request.POST['visit_time']
        phone = request.POST['phone']
        
        admit = Admission(file_number=file_number,name=name,id_number=id_number,dof=dof,weight=weight,day=day,
                date=date,case_description=case_description,full_name_new=full_name_new,description_new=description_new,
                start_date=start_date,end_date=end_date,visit_case=visit_case,visit_date=visit_date,
                case_description_new=case_description_new,doctor_name=doctor_name,visit_time=visit_time,
                phone=phone)
        admit.save()
        
    return redirect('reception')

def discharge(request):
    admission = Admission.objects.all()
    context = {
        "admit": admission
    }
    return render(request, 'discharge.html', context)


def discharge_patient(request , pk):
    admission = Admission.objects.filter(id__exact=pk)
    context = {
        "data": admission
    }
    return render(request, 'patient_discharge.html', context)


def trends(request):
    context1=[]
    customer = customers.objects.all()
    customers_all= customer.count()
    days = ['monday', 'tuesday', 'wednesday', 'thursday', 'Friday', 'Saturday','sunday'] 
    if request.method=='GET':
            monday_customers_count= customer.filter(day__iexact=days[0]).count()
            tuesday_customers_count= customer.filter(day__iexact=days[1]).count()
            wednesday_customers_count= customer.filter(day__iexact=days[2]).count()
            thursday_customers_count= customer.filter(day__iexact=days[3]).count()
            friday_customers_count= customer.filter(day__iexact=days[4]).count()
            saturday_customers_count= customer.filter(day__iexact=days[5]).count()
            sunday_customers_count= customer.filter(day__iexact=days[6]).count()
            
            list1 =[
               monday_customers_count,
               tuesday_customers_count,
               wednesday_customers_count,
               thursday_customers_count,
               friday_customers_count,
               saturday_customers_count,
               sunday_customers_count
                
            ]
            context1.extend(list1)
            context = {
                "customers":context1,
            }
            json.dumps(context)
    return JsonResponse(context, safe=False)      


def patient(request):
    if request.method == "GET":
        date = request.GET['date']
        data = customers.objects.filter(date__iexact=date)
        serialized_data = serialize( "json",data)
        json_data = json.loads(serialized_data)
        
        context ={
            'data':json_data,
        }
        return JsonResponse(context, safe=False)
    
def feedback(request):
    if request.method == 'POST':
        name = request.POST['username']
        email = request.POST['email']
        subject = request.POST['subject']
        date = request.POST['date']
        message = request.POST['message']
        phone = request.POST['phone']
        
        rec = feedback(name=name, email=email, subject=subject,
                       date=date, message=message, contacts=phone)
        if rec:
            messages.info(request, 'your feedback has been successfully submitted')
    return render(request, 'feedback.html')     
     
'''need to use custom model class for role authentication'''
'''from django.contrib.auth.models import AbstractUser
class CustomModel(AbstractUser):
add fields required then add auth_user_model='myapp.myModel'
'''   

def Query_patient(request):
    current_patient = customers.objects.filter(date_created__iexact=timezone.now())
    serialized_patient = serialize('json', current_patient)
    data = json.loads(serialized_patient)
    context ={
        'data': data,
    }
    #print(timezone.now())
    return JsonResponse(context, safe=False)

def current_patient(request):
    current_date = datetime.datetime.now()
    current_patient = customers.objects.filter(date_created=current_date).values()
    return render(request, 'current_patients.html', {"attended":current_patient})      

def pharmacy(request):
    return render(request, 'pharmacy.html')

def payment(request):
    if "number" in request.GET:
        number = request.GET["number"]
        attended = customers.objects.filter(file_number__icontains=number)
    elif "name" in request.GET:
         name = request.GET["name"]
         attended = customers.objects.filter(name__icontains=name)
    elif "phone" in request.GET:
        phone = request.GET["phone"]
        attended = customers.objects.filter(client_contact__icontains=phone)
    elif "visit_date" in request.GET:
        date = request.GET["visit_date"]
        attended = customers.objects.filter(date_created__iexact=date)    
    else:
        attended = customers.objects.filter(date_created=datetime.datetime.now())          
    context = {
        "attended": attended,
    }    
    return render(request, 'payments.html',context)

def make_payment(request, pk):
    existing_details = customers.objects.filter(id=pk)
    person_info = customers.objects.filter(id=pk)
    
    context = {
        'data': existing_details,
        'person_info': person_info
    }
    return render(request, 'make_payment.html', context)

    