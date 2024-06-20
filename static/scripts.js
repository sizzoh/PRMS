function query() {
    $(document).ready(function () {
      var table = $(".tbl");
        var client_number = $("#number");
        var client_name = $("#name");
        console.log(client_number);
        var phone = $("#phone");
      var client_email = $("#email");
      $.ajax({
        type: "GET",
        url: "/medicationQuery",
        dataType: "json",
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        success: function (response) {
          console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
    });
}


function capture() {
  $(function () { 
    var matter = $("#visit_case");
    let name = $("#consultant");

    $.ajax({
      type: "GET",
      url: "/staff_specialty",
      dataType: "json",
      data: { specialty: matter.val() },
      success: function (data) { 
        let items = data.data_object;
        for (let i in items) { 
          name.val(items[i]['fields'].name);
        }
      },
      error: function (error, textStatus, errorThrown) {
        console.log("Error: " + error + ": " + textStatus + ": " + errorThrown);
      }
    })
  })
}
   

function login() { 
    $(document).ready(function () {
        var name = $("#name").val();
  //console.log(name);
    });
}


//   function reception(){
//     $(document).ready(function () { 
//       let name = $("#name");
//       let date = $("#date");
//       let number = $("#number");
//       let values = [name, date, number];
//       for (let i = 0; i < values.length; i++) { 
//         values[i].on("keypress", function () {
//          alert("keypress event"); 
//         });
        
//       }
//     });
// }

function loginAuthenticate() {
      var name = document.getElementById("username");
      localStorage.setItem("username", name.value);
          fetch("/medicationQuery")
            .then(function (response) {
              response.json();
            })
            .then((data) => {
              //console.log(data);
            })
            .catch(function (error) {
              console.log(error);
            });         
}

function home() { 
  $(document).ready(function () {
    var name = localStorage.getItem('username');
    var username = $("#username").val();
    var login_user = $("#user");
    var loginUser = $('#loginUser');
    loginUser.html(name +"  ");
    login_user.html("Welcome ").css({'color': 'white', 'margin':'3px', 'display': 'inline'});
    loginUser.css({ 'color': 'white', 'display': 'inline' });
    login_user.on('click', function () { 
      localStorage.removeItem("username");
      if (name === null) {
        window.location = "/index";
      }
    //$("#shareBtn").prepend($("<span>")).text(count(name)).css({color:'green'});
    });
    
    //declare divs for managing their display
    var div1 = $("#div1");
    var div2 = $("#div2");
    var div3 = $("#div3");
    var div4 = $("#div4");
    var div5 = $("#div5");
    var div6 = $("#div6");
    var div7 = $("#div7");
    var div8 = $("#div8");
    var div9 = $("#div9");
    var div10 = $("#div10");
    var div11 = $("#div11");
    var div12 = $("#div12");
    //display current registered patients
    var currentPatients = div1.find("i").html();
    if(currentPatients>=1){
      div1.find("#new_p").append("new patients").click(function(){
        $.ajax({
          type: 'GET',
          url: '/current_patient',
          csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
          success: function(patient_data){
          window.location = ("/current_patient");
          },
          error: function(error, errorMessage, errorThrown){
          console.log(error +  errorThrown+ ": " + errorMessage);
          }
        })
      });
    }else{
      div1.find("#new_p").hide();
    }
    //get username to authenticate user role
     $.ajax({
       type: "GET",
       url: "/user_data",
       data: { name: name },
       csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
       success: function (data) {
         //now manage their display according to login user role
         var customer = data.customer_data;
         var staff = data.staff_data;
         var user = data.auth;

         console.log(user);
         console.log(staff);
         console.log(customer);
         for (var i in customer) { 
           console.log(customer[i]['fields'].file_number);
           for (var j in staff) {
             for (var k in user) {
               if (customer[i]["fields"].reg_name === name &&
                   user[k]["fields"].username === name 
                   //customer[i]["fields"].role === "customer" 
                 ) {
                 loginUser.append(": Patient ");
                 var divs = [div3, div4, div6, div7, div8, div9, div10];
                 for (var i in divs) {
                   divs[i]
                     .attr("class", "col-md-3 disabled")
                     .find("a")
                     .on("click", function (e) {
                       e.preventDefault();
                       alert("you are not allowed to perform this action");
                       $(this).attr("href", "home");
                     });
                 }
                 //#register when patient himself/herself act on reception work
                 //#admit_patient when patient himself/herself act on reception work
                 var d = new Date();
                 var y = d.getFullYear();
                 var m = d.getMonth();
                 var s = d.getDate();
                 var full_date = y + "-" + m + "-" + s;
                 $("#admit_patient").submit(function (e) {
                   $.ajax({
                     type: "GET",
                     url: "/patient",
                     dataType: "json",
                     data: { date: full_date },
                     csrfmiddlewaretoken: $(
                       "input[name='csrfmiddlewaretoken']"
                     ).val(),
                     success: function (data) {
                       let details = data.data;
                       for (var key in details) {
                         div1
                           .find("i")
                           .text(details[key].length)
                           .append("new patients")
                           .css({ color: "red" });
                       }
                     },
                   });
                 });
                 //another page submit
                 $("#register").submit(function (e) {
                   $.ajax({
                     type: "GET",
                     url: "/patient",
                     dataType: "json",
                     data: { date: full_date },
                     csrfmiddlewaretoken: $(
                       "input[name='csrfmiddlewaretoken']"
                     ).val(),
                     success: function (data) {
                       let details = data.data;
                       for (var key in details) {
                         div1
                           .find("i")
                           .text(details[key].length)
                           .append("new patients")
                           .css({ color: "red" });
                       }
                     },
                   });
                 });
               } else if (
                 user[k]["fields"].username === name &&
                 staff[j]["fields"].name === name &&
                 staff[j]["fields"].role === "Doctor"
               ) {
                 loginUser.append(": Doctor ");
                 let my_div = [div1, div4, div5, div6, div9];
                 for (var i in my_div) {
                   my_div[i]
                     .attr("class", "col-md-3 disabled")
                     .find("a")
                     .on("click", function (e) {
                       e.preventDefault();
                       alert("you are not allowed to perform this action");
                       $(this).attr("href", "home");
                     });
                 }
               } else if (
                 user[k]["fields"].username === name &&
                 staff[j]["fields"].name === name &&
                 staff[j]["fields"].role === "receptionist"
               ) {
                 loginUser.append(": Receptionist ");
                 var my_divs = [div3, div4, div6, div5, div7, div8, div9];
                 for (var i in my_divs) {
                   my_divs[i]
                     .attr("class", "col-md-3 disabled")
                     .find("a")
                     .on("click", function (e) {
                       e.preventDefault();
                       alert("you are not allowed to perform this action");
                       $(this).attr("href", "home");
                     });
                 }
               } else if (
                 user[k]["fields"].username === name &&
                 staff[j]["fields"].name === name &&
                 staff[j]["fields"].role === "accountant"
               ) {
                 loginUser.append(": Accountant ");
                 let my_div = [div1, div3, div5, div7, div8, div9, div10];
                 for (var i in my_div) {
                   my_div[i]
                     .attr("class", "col-md-3 disabled")
                     .find("a")
                     .on("click", function (e) {
                       e.preventDefault();
                       alert("you are not allowed to perform this action");
                       $(this).attr("href", "home");
                     });
                 }
               } else if (
                 user[k]["fields"].username === name &&
                 staff[j]["fields"].name === name &&
                 staff[j]["fields"].role === "laboratory technician"
               ) {
                 loginUser.append(":Lab Technician ");
                 let my_div = [div1, div3, div5, div6, div7, div8, div9];
                 for (var i in my_div) {
                   my_div[i]
                     .attr("class", "col-md-3 disabled")
                     .find("a")
                     .on("click", function (e) {
                       e.preventDefault();
                       alert("you are not allowed to perform this action");
                       $(this).attr("href", "home");
                     });
                 }
               } else {
                 loginUser.append(": Admin ");
                 //  let my_div = [div1, div3, div5, div6, div7, div8, div9];
                 //  for (var i in my_div) {
                 //    my_div[i].attr("class", "col-md-3 disabled").find("a").on("click", function (e) {
                 //      e.preventDefault();
                 //      alert("you are not allowed to perform this action");
                 //      $(this).attr("href","home");
                 //     });
                 //   }
               } 
             }
             break;
           } 
           break;
         }
       },
       error: function (jqXHR, textStatus, errorThrown) {
         console.log(errorThrown);
       },
     });
    //hide patient  div && admitted patients div
    var div = $("#includes");
    var admitted_div = $("#admitted");
    div.hide();
    admitted_div.hide();
    //reshow patient page && show admitted patients
    var showDiv = $("#patient_manage");
    showDiv.click(function () {
      div.show();
    });
    var showPatient = $("#discharge");
    showPatient.click(function () { 
      admitted_div.show();
    });
    var search_doctor = $('name');
    search_doctor.on("input", function (e) {
      $.ajax({
        type: "GET",
        url: "/RegDoc",
        data: { name: search_doctor.val() },
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        success: function (response) {},
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    });
    //calculate age from date of birth
    let dof = $("input[name=dof]");
    dof.on("change", function(){
      let inputDate = $(this).val();
      let date = new Date();
      let age = date.getFullYear() - new Date(inputDate).getFullYear();
    $("input[name=age]").val(age);
    });

    //payment management section
  var cost =$("input[name=cost]");
  const visit_case = $("#service_case");
  let cases = ['Skin', 'Neurons','Brain', 'Bones','Gut','Children',
  'Radiology','Counseling','Plastic Surgery', 'Eyes','Dental', 
  'Heart','Tumor','Belly','Specialist'];

   visit_case.on('click',function(event){
    if(visit_case.val() ===cases[0]) {
      cost.val(20000);
     }
     else if(visit_case.val() ===cases[1]) {
       cost.val(30000); 
     }
     else if(visit_case.val() ===cases[2]) {
       cost.val(30000); 
     }
     else if(visit_case.val() ===cases[3]) {
       cost.val(25000); 
     }
     else if(visit_case.val() ===cases[4]) {
       cost.val(15000); 
     }
     else if(visit_case.val() ===cases[5]) {
       cost.val(10000); 
     }
     else if(visit_case.val() ===cases[6]) {
       cost.val(30000); 
     }
     else if(visit_case.val() ===cases[7]) {
       cost.val(15000); 
     }
     else if(visit_case.val() ===cases[8]) {
       cost.val(35000); 
     }
     else if(visit_case.val() ===cases[9]) {
       cost.val(25000); 
     }
     else if(visit_case.val() ===cases[10]) {
       cost.val(30000); 
     }
     else if(visit_case.val() ===cases[11]) {
       cost.val(30000); 
     }
     else if(visit_case.val() ===cases[12]) {
       cost.val(20000); 
     }
     else if(visit_case.val() ===cases[13]) {
       cost.val(10000); 
     }
     else if(visit_case.val() ===cases[14]) {
       cost.val(35000); 
     }
   });
   //handle receipt container
$('#receipt_container').css({
  backgroundColor: 'cyan',
  maxWidth: '50%',
  maxHeight: '100%',
  marginLeft:"30%",

});
var payer = $("input[name=payer]").val();
   var payment_day = $("input[name=payment_day]").val();
   var payment_time = $("input[name=payment_time]").val();
   var pay_date = $("input[name=payment_date]").val();
   var visit_cases = $("select[name=visit_case]").val();
   var pay_amount = $("input[name=cost").val();
   var controlNumber = $("input[name=control_number]").val();

   var bntPay = $("button[name=payment]");
   var divPay = $("#receipt_container");
   var payer_para = $("p").text(payer).prepend("Name: ");
   var day_para = $("<p>").text(payment_day).prepend("On: ");
   var time_para = $("<p>").text(payment_time).prepend("At: ");
   var date_para = $("<p>").text(pay_date).prepend("During: ");
   var case_para = $("<p>").text(visit_cases).prepend("For: ").append("Checkup");
   var amount_para = $("<p>").text(pay_amount).prepend("Paid Amount: ").append("Tsh Cash");
   var control_number_para = $("<p>").text(controlNumber).prepend("Paid Control Number: ");

   bntPay.on("click", function(e) {
    alert("button click");
    e.preventDefault();
    divPay.append(payer_para+"<br> "+day_para+"<br> "+time_para+"<br> "+date_para+"<br>"+case_para+"<br> "+amount_para+"<br> "+control_number_para);
    $("#container_receipt").append(divPay);
    print(divPay);
   });
   Handle_appointment();
});
}

function Handle_appointment(){
  $(function() {
    var name = localStorage.getItem('username');
    //display appointments inaccordance to login user
    $.ajax({
      type: "GET",
      url: "/Query_appointment",
      dataType: "json",
      data:{name: name},
      success: function(data) {
        var appointment = data.appointment_data;
        let table = $("#tbl_appointment tbody");
        table.empty();
        for (let i in appointment) {
          var row = $("<tr>");
          var a = $("<a>").attr({"href": "#"});
          let button1= $("<button>").attr({"class": "btn btn-info"}).text("Edit").append($("<i>").attr({"class":"fa fa-pencil"}));
          let button2= $("<button>").attr({"class": "btn btn-danger"}).text("Delete").append($("<i>").attr({"class":"fa fa-trash-can"}));
          
          var td = $("<td>").append(a).append(button2).prepend(button1);
          let td2 = $("<td>").text(localStorage.getItem("status"));
          row.append($("<td>").text(appointment[i]["pk"]));
          row.append($("<td>").text(appointment[i]["fields"].patient_number));
          row.append($("<td>").text(appointment[i]["fields"].name));
          row.append($("<td>").text(appointment[i]["fields"].age));
          row.append($("<td>").text(appointment[i]["fields"].gender));
          row.append($("<td>").text(appointment[i]["fields"].marital));
          row.append($("<td>").text(appointment[i]["fields"].address));
          row.append($("<td>").text(appointment[i]["fields"].phone));
          row.append($("<td>").text(appointment[i]["fields"].category));
          row.append($("<td>").text(appointment[i]["fields"].consultant_name));
          row.append($("<td>").text(appointment[i]["fields"].consultant_contacts));
          row.append($("<td>").text(appointment[i]["fields"].date));
          row.append($("<td>").text(appointment[i]["fields"].start_date));
          row.append($("<td>").text(appointment[i]["fields"].end_date));
          row.append(td);
          row.append(td2);
          button1.on("click", function(e) {
            $.ajax({
              type: "GET",
              url: "/edit_appointment",
              data:{pk:appointment[i]["pk"]},
              csrfmiddlewaretoken:$("input[name='csrfmiddlewaretoken']").val(),
              success: function(data) {
                window.location = ("edit_appointment?pk="+appointment[i]["pk"]);
              },
              error: function(jqXHR, textStatus, errorThrown){
                console.log(errorThrown);
              }
            }) 
          });
          button2.on("click", function(e) {
            $.ajax({
              type: "GET",
              url: "/delete_appointment",
              data:{pk:appointment[i]["pk"]},
              csrfmiddlewaretoken:$("input[name='csrfmiddlewaretoken']").val(),
              success: function(data) {
                window.location = ("delete_appointment?pk="+appointment[i]["pk"]);
              },
              error: function(jqXHR, textStatus, errorThrown){
                console.log(errorThrown);
              }
            }) 
          });
          let buttonAccept = $("#accept");
          let buttonReject = $("#reject");
          buttonAccept.click(function(){
            td2.text("Accepted");
            localStorage.setItem("status",td2.text());
            window.location = ("Appointment_details")
          });
          buttonReject.click(function(){
            td2.text("Rejected");
            localStorage.setItem("status",td2.text());
            window.location = ("RejectedAppointment")
          });
        }
        table.append(row);
        //table to review the appointment feedback
        let table_feedback = $("#tbl_appointment_review");
        let tbl_feedback_body =$("#tbl_appointment_review tbody");
        table_feedback.hide();
        $("#schedule").hide();
        //table to review the appointment feedback rejected
        let table_feedback_rejected = $("#tbl_appointment_review_rejected");
        let tbl_feedback_body_rejected =$("#tbl_appointment_review_rejected tbody");
        table_feedback_rejected.hide();
        $("#schedules").hide();
        if (localStorage.getItem("status") == "Accepted"){
            $.ajax({
            type: "GET",
            url: "Query_AppointmentAccepted",
            dataType: "json",
            csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
            success: function(response){
            let appointment_accepted = response.data;
            let row = $("<tr>");
            var a = $("<a>").attr({"href": "#"});
            //let button3= $("<button>").attr({"class": "btn btn-info"}).text("Edit").append($("<i>").attr({"class":"fa fa-pencil"}));
            //let button4= $("<button>").attr({"class": "btn btn-danger"}).text("Delete").append($("<i>").attr({"class":"fa fa-trash-can"}));
            //var td = $("<td>").append(a).append(button4).prepend(button3);
            row.append($("<td>").text(appointment_accepted[i]["pk"]));
            row.append($("<td>").text(appointment_accepted[i]["fields"].name));
            row.append($("<td>").text(appointment_accepted[i]["fields"].email));
            row.append($("<td>").text(appointment_accepted[i]["fields"].address));
            row.append($("<td>").text(appointment_accepted[i]["fields"].phone));
            row.append($("<td>").text(appointment_accepted[i]["fields"].specialty));
            row.append($("<td>").text(appointment_accepted[i]["fields"].date));
            row.append($("<td>").text(appointment_accepted[i]["fields"].start_time));
            row.append($("<td>").text(appointment_accepted[i]["fields"].end_time));
            row.append($("<td>").text(appointment_accepted[i]["fields"].cost));
            //row.append(td);

            $("#btn_review_appointment").click(function(e) {
              tbl_feedback_body.append(row);
              table_feedback.append(tbl_feedback_body)
              $("#schedule").show();
              table_feedback.show();
            })
          },
          error: function(jqXHR, textStatus, errorThrown){
          console.log(errorThrown);
          }
        });
        }
       else if (localStorage.getItem("status") == "Rejected"){
          $.ajax({
          type: "GET",
          url: "Query_AppointmentRejected",
          dataType: "json",
          csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
          success: function(response){
          let appointment_accepted = response.data;
          let row = $("<tr>");
          let a = $("<a>").attr({"href": "#"});
          //let button3= $("<button>").attr({"class": "btn btn-info"}).text("Edit").append($("<i>").attr({"class":"fa fa-pencil"}));
          //let button4= $("<button>").attr({"class": "btn btn-danger"}).text("Delete").append($("<i>").attr({"class":"fa fa-trash-can"}));
          //var td = $("<td>").append(a).append(button4).prepend(button3);
          row.append($("<td>").text(appointment_accepted[i]["pk"]));
          row.append($("<td>").text(appointment_accepted[i]["fields"].name));
          row.append($("<td>").text(appointment_accepted[i]["fields"].email));
          row.append($("<td>").text(appointment_accepted[i]["fields"].address));
          row.append($("<td>").text(appointment_accepted[i]["fields"].phone));
          row.append($("<td>").text(appointment_accepted[i]["fields"].specialty));
          row.append($("<td>").text(appointment_accepted[i]["fields"].date));
          row.append($("<td>").text(appointment_accepted[i]["fields"].reason));
          row.append($("<td>").text(appointment_accepted[i]["fields"].day));
          row.append($("<td>").text(appointment_accepted[i]["fields"].start_time));
          row.append($("<td>").text(appointment_accepted[i]["fields"].end_time));
          row.append($("<td>").text(appointment_accepted[i]["fields"].cost));
          //row.append(td);

          $("#btn_review_appointment").click(function(e) {
            tbl_feedback_body_rejected.append(row);
            table_feedback_rejected.append(tbl_feedback_body_rejected)
            $("#schedules").show();
            table_feedback_rejected.show();
          })
        },
        error: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
        }
      });
      }
        
       for(var i in appointment) {
        var file_number = appointment[i]["fields"].patient_number;
        $.ajax({
          type: "GET",
          url: "/appointment",
          data:{file_number: file_number},
          success: function(data) {
          },
          error: function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown);
          }
        });
       }
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown+ " "+textStatus);
      }
    });
  })
}
// function printReceipt(){
//   $(function(){
//    var payer = $("input[name=payer").val();
//    var payment_day = $("input[name=payment_day").val();
//    var payment_time = $("input[name=payment_time").val();
//    var pay_date = $("input[name=payment_date").val();
//    var visit_case = $("select[name=visit_case").val();
//    var pay_amount = $("input[name=cost").val();
//    var controlNumber = $("input[name=control_number").val();

//    var bntPay = $("button[name=payment");
//    var divPay = $("#receipt_container").attr("class","container-lg");
//    var payer_para = $("<p>").html(payer).prepend("Name: ");
//    var day_para = $("<p>").html(payment_day).prepend("On: ");
//    var time_para = $("<p>").html(payment_time).prepend("At: ");
//    var date_para = $("<p>").html(pay_date).prepend("During: ");
//    var case_para = $("<p>").html(visit_case).prepend("For: ").append("Checkup");
//    var amount_para = $("<p>").html(pay_amount).prepend("Paid Amount: ").append("Tsh Cash");
//    var control_number_para = $("<p>").html(controlNumber).prepend("Paid Control Number: ");

//    bntPay.on("click", function(e) {
//     //alert("button click");
//     e.preventDefault();
//     divPay.append(payer_para+"<br> "+day_para+"<br> "+time_para+"<br> "+date_para+"<br>"+case_para+"<br> "+amount_para+"<br> "+control_number_para);
//     print(divPay);
//    });
//   });
// }

// function getYear(){
//   $(function(){
//     const dateInput = $(this).val();
//     const date = new Date(dateInput);
//     if(dateInput){
//       const age = $("#age");
//       age.val(date.getFullYear());
//     }
//   })
// }
function hideNavigationBar(){
  $(function () {
    $("#sidebarMenu").fadeOut("slow", function(){
      $(document).find($("button[type='button']")).click(function () {
        //console.log("button clicked");
        $("#sidebarMenu").fadeIn("slow");
      }); 
    })
  })
}

function payment(){
$(function(){
  const cost =$("input[name=cost]");
  const visit_case = $(this).val();
  let cases = ['Skin', 'Neuron','Brain', 'Bones','Gut','Children',
  'Radiology','Counseling','Plastic Surgery', 'Eyes','Dental', 
  'Heart','Turmer','Belly','Specialist'];

  if(visit_case ===cases[0]) {
   cost.val(20000);
  }
  else if(visit_case ===cases[1]) {
    cost.val(30000); 
  }
  else if(visit_case ===cases[2]) {
    cost.val(30000); 
  }
  else if(visit_case ===cases[3]) {
    cost.val(25000); 
  }
  else if(visit_case ===cases[4]) {
    cost.val(15000); 
  }
  else if(visit_case ===cases[5]) {
    cost.val(10000); 
  }
  else if(visit_case ===cases[6]) {
    cost.val(20000); 
  }
  else if(visit_case ===cases[7]) {
    cost.val(10000); 
  }
  else if(visit_case ===cases[8]) {
    cost.val(30000); 
  }
  else if(visit_case ===cases[9]) {
    cost.val(25000); 
  }
  else if(visit_case ===cases[10]) {
    cost.val(30000); 
  }
  else if(visit_case ===cases[11]) {
    cost.val(30000); 
  }
  else if(visit_case ===cases[12]) {
    cost.val(30000); 
  }
  else if(visit_case ===cases[13]) {
    cost.val(20000); 
  }
  else if(visit_case ===cases[14]) {
    cost.val(10000); 
  }
  else if(visit_case ===cases[15]) {
    cost.val(35000); 
  }
});
}

function admit() {
  $(document).ready(function () {
    var row = $("#btl1");
    var name = localStorage.getItem("username");
    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
      type: "GET",
      url: "/medicationQuery",
      dataType: "json",
      csrfmiddlewaretoken:csrfToken,
      success: function (response) {
        $.ajax({
          type: "GET",
          url: "/existing_prescriptions",
          dataType: "json",
          //data: {"file_number": response.data["file_number"] },
          csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
          success: function (response2) {
            console.log(response.data);
            var file;
            var card = $("#card_number");
            var id = $("#id_number");
            var p_name = $("#p_name");
            var age = $("#age");
            var dof = $("#dof");
            var weight = $("#weight");
            var date = $("#date");
            var cases = $("#case");
            var case_description = $("#case_description");
            var start_date = $("#start_date");
            var end_date = $("#end_date");

            for (file in response.data) {
              console.log(response.data[file]["file_number"]);
              console.log("response from server");
              card.val(response.data[file]["card_number"]);
              id.val(response.data[file]["id_number"]);
              age.val(response.data[file]["age"]);
              dof.val(response.data[file]["dof"]);
              p_name.val(response.data[file]["name"]);
              weight.val(response.data[file]["weight"]);
              date.val(response.data[file]["date"]);
              cases.val(response.data[file]["cases"]);
              start_date.val(response.data[file]["start_date"]);
              end_date.val(response.data[file]["end_date"]);
            }
           //window.location = ("/prescriptions");
            
          },
        });
      },
      error: function (error, errorThrown, errorMessage, status) {
        console.log(errorMessage + " " + errorThrown);
      },
    });
  });
}

function prescriptionUrl(){
  $(function () { 
    $.ajax({
      type: "GET",
      url: "/prescriptions",
      dataType: "json",
      csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
      success: function (response) {
        console.log(response.data);
      },
      error: function (errorThrown, errorMessage) {
        console.log(errorThrown, errorMessage + "" + " url error");
      },
    });
  })
}

function search() {
  $(function () {
    let name = $("#patient_name");
    let file_number = $("#patient_number");
    let phone = $("#patient_phone");
    let date = $("#visit_date");
    // name.on("keypress", function () {
      $.ajax({
        type: "GET",
        url: "/reception",
        data: { name: name.val() },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {},
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    // });
    // file_number.on("keypress", function () {
      $.ajax({
        type: "GET",
        url: "/reception",
        data: { number: file_number.val() },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {},
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    // });
    // phone.on("keypress", function () {
      $.ajax({
        type: "GET",
        url: "/reception",
        data: { phone: phone.val() },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {},
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    // });
    // date.on("click", function () {
      $.ajax({
        type: "GET",
        url: "/reception",
        data: { visit_date: date.val() },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {},
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    // });
  });
}

function searchData() {
  $(function () {
    let name = $("#patient_name");
    let file_number = $("#patient_number");
    let phone = $("#patient_phone");
    let date = $("#visit_date");
    //alert("inputting some content ... ");
    $.ajax({
      type: "GET",
      url: "/searchData",
      data: {
        name: name.val(),
      },
      csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      success: function (response) {
        var data = response.attended;
        let table = $("#table_data tbody");

        if (name.val().length > 0) {
          table.empty();
          if (data.length > 0) {
            for (let i in data) {
              var row = $("<tr>");
              var a = $("<a>").attr({"href": "#","class":"text-bg-success text-decoration-none p-2"}).text("Check_In");
              var td = $("<td>").append(a);
              row.append($("<td>").text(data[i]["fields"].id));
              row.append($("<td>").text(data[i]["fields"].file_number));
              row.append($("<td>").text(data[i]["fields"].name));
              row.append($("<td>").text(data[i]["fields"].age));
              row.append($("<td>").text(data[i]["fields"].sex));
              row.append($("<td>").text(data[i]["fields"].marital_status));
              row.append($("<td>").text(data[i]["fields"].street));
              row.append($("<td>").text(data[i]["fields"].date_created));
              row.append($("<td>").text(data[i]["fields"].client_contact));
              row.append($("<td>").text(data[i]["fields"].dof));
              row.append($("<td>").text(data[i]["fields"].weight));
              row.append(td);

            }
            table.append(row);
          } else {
            table.append(
              "<tr><td><div class='alert alert-danger text-center fs-5'>no data item was found</div></td></tr>"
            );
          }
        } else {
        }
      },
      error: function (error, textStatus, errorThrown) {
        console.log(error + "  " + errorThrown);
      },
    }),
      $.ajax({
        type: "GET",
        url: "/searchData",
        data: {
          patient_number: file_number.val(),
        },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {
          var data = response.attended;
          let table = $("#table_data tbody");
          if (file_number.val().length > 0) {
            table.empty();
            if (data.length > 0) {
              for (let i in data) {
                var row = $("<tr>");
                var a = $("<a>")
                  .attr({
                    href: "#",
                    class: "text-bg-success text-decoration-none p-2",
                  })
                  .text("Check_In");
                var td = $("<td>").append(a);
                row.append($("<td>").text(data[i]["fields"].id));
                row.append($("<td>").text(data[i]["fields"].file_number));
                row.append($("<td>").text(data[i]["fields"].name));
                row.append($("<td>").text(data[i]["fields"].age));
                row.append($("<td>").text(data[i]["fields"].sex));
                row.append($("<td>").text(data[i]["fields"].marital_status));
                row.append($("<td>").text(data[i]["fields"].street));
                row.append($("<td>").text(data[i]["fields"].date_created));
                row.append($("<td>").text(data[i]["fields"].client_contact));
                row.append($("<td>").text(data[i]["fields"].dof));
                row.append($("<td>").text(data[i]["fields"].weight));
                row.append(td);
              }
              table.append(row);
            } else {
              table.append(
                "<tr><td><div class='alert alert-danger text-center fs-5'>no data item was found</div></td></tr>"
              );
            }
          } else {
          }
        },
        error: function (error, textStatus, errorThrown) {
          console.log(error + "  " + errorThrown);
        },
      }),
      $.ajax({
        type: "GET",
        url: "/searchData",
        data: {
          phone: phone.val(),
        },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {
          var data = response.attended;
          let table = $("#table_data tbody");
          if (phone.val().length > 0) {
            table.empty();
            if (data.length > 0) {
              for (let i in data) {
                var row = $("<tr>");
                var a = $("<a>")
                  .attr({
                    href: "#",
                    class: "text-bg-success text-decoration-none p-2",
                  })
                  .text("Check_In");
                var td = $("<td>").append(a);
                row.append($("<td>").text(data[i]["fields"].id));
                row.append($("<td>").text(data[i]["fields"].file_number));
                row.append($("<td>").text(data[i]["fields"].name));
                row.append($("<td>").text(data[i]["fields"].age));
                row.append($("<td>").text(data[i]["fields"].sex));
                row.append($("<td>").text(data[i]["fields"].marital_status));
                row.append($("<td>").text(data[i]["fields"].street));
                row.append($("<td>").text(data[i]["fields"].date_created));
                row.append($("<td>").text(data[i]["fields"].client_contact));
                row.append($("<td>").text(data[i]["fields"].dof));
                row.append($("<td>").text(data[i]["fields"].weight));
                row.append(td);
              }
              table.append(row);
            } else {
              table.append(
                "<tr><td><div class='alert alert-danger text-center fs-5'>no data item was found</div></td></tr>"
              );
            }
          } else {
          }
        },
        error: function (error, textStatus, errorThrown) {
          console.log(error + "  " + errorThrown);
        },
      }),
      $.ajax({
        type: "GET",
        url: "/searchData",
        data: {
          visit_date: date.val(),
        },
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
        success: function (response) {
          var data = response.attended;
          let table = $("#table_data tbody");
          if (date.val().length > 0) {
            table.empty();
            if (data.length > 0) {
              for (let i in data) {
                var row = $("<tr>");
                var a = $("<a>")
                  .attr({
                    href: "#",
                    class: "text-bg-success text-decoration-none p-2",
                  })
                  .text("Check_In");
                var td = $("<td>").append(a);
                row.append($("<td>").text(data[i]["fields"].id));
                row.append($("<td>").text(data[i]["fields"].file_number));
                row.append($("<td>").text(data[i]["fields"].name));
                row.append($("<td>").text(data[i]["fields"].age));
                row.append($("<td>").text(data[i]["fields"].sex));
                row.append($("<td>").text(data[i]["fields"].marital_status));
                row.append($("<td>").text(data[i]["fields"].street));
                row.append($("<td>").text(data[i]["fields"].date_created));
                row.append($("<td>").text(data[i]["fields"].client_contact));
                row.append($("<td>").text(data[i]["fields"].dof));
                row.append($("<td>").text(data[i]["fields"].weight));
                roe.appendRow(td);
              }
              table.append(row);
            } else {
              table.append(
                "<tr><td><div class='alert alert-danger text-center fs-5'>no data item was found</div></td></tr>"
              );
            }
          } else {
          }
        },
        error: function (error, textStatus, errorThrown) {
          console.log(error + "  " + errorThrown);
        },
      });
  });
}

function appointment_manage() {
  $(function () { 
    let user = localStorage.getItem('username');
  let accepted = "Accepted";  
    let rejected = "Rejected";
    
    $.ajax({
      type: "GET",
      url: "/status",
      dataType: "json",
      data: { accept: accepted, reject: rejected},
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      success: function (response) { 
        let status = response.status;
        for (let i in status) {
          $("#status").text(status[i]['fields'].accept);
        }
      },
      error: function (status, textStatus, errorThrown) {
       console.log(errorThrown + " " + textStatus); 
      }
    })
    
  })
}

 function signature() {
   $(function () {
    var sigPad = $("#signatureContainer").signature({syncField:"#signature", syncFormat:"PNG"});

     $("#save").on("click", function () {
       console.log($("#signatureContainer"));
     });
     $("#clear").on("click", function (e) { 
       e.preventDefault();
        sigPad.signature('clear');
     });
   });
}
 
function chart() {
  var trendChart = document.getElementById("myChart").getContext("2d");
  $(document).ready(function () { 
    $.ajax({
      type: "GET",
      url: "/trends",
      dataType: "json",
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
      success: function (response) {
        let value = response.customers;
        var trend = new Chart(trendChart, {
          type: "bar",
          data: {
            labels: [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
            datasets:[
              {
                label: "weekly patients attendance trend",
                data: [
                  value[0],
                  value[1],
                  value[2],
                  value[3],
                  value[4],
                  value[5],
                  value[6],
                ],
                backgroundColor:[
                  "#f56954",
                  "#00a65a",
                  "#f39c12",
                  "#00c0ef",
                  "#3c8dbc",
                  "#d2d6de",
                ],
                barThickness:50,
              },
            ],
            options: {
              scales: {
                x: {
                  barPercentage:0.75,
                }
              }
            },
          },
        });
      },
      error: function (error, errorThrown) {
        console.log(error + " " + errorThrown);
      },
    });
  });
}

//not used yet
/*function doctor1() {
  $(document).ready(function () {
    var docName = $("#doc_name").val();
    var docPhone = $("#doc_phone").val();
    var docEmail = $("#doc_email").val();

    $.ajax({
      type: "GET",
      url: "/RegDoc",
      data: { name: docName },
      csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      success: function (response) {},
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }, 
    });
  });
}

function doctor2() {
  $(document).ready(function () {
    var docName = $("#doc_name").val();
    var docPhone = $("#doc_phone").val();
    var docEmail = $("#doc_email").val();

    $.ajax({
      type: "GET",
      url: "/RegDoc",
      data: { phone: docPhone },
      csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      success: function (response) {},
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  });
}

function doctor3() {
  $(document).ready(function () {
    var docName = $("#doc_name").val();
    var docPhone = $("#doc_phone").val();
    var docEmail = $("#doc_email").val();

    $.ajax({
      type: "GET",
      url: "/RegDoc",
      data: { email: docEmail },
      csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      success: function (response) {},
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  });
}
*/
function search_medication() {
  $(function () { 
    $('#search_medication').on('click', function (e) {
      e.preventDefault();
      var items = $("patient_number").val();
      $.ajax({
        type: 'GET',
        url: '/medication',
        data: { 'name': items },
        csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        success: function (response) {
          $.ajax({
            type: 'GET',
            url: '/Query_patient',
            dataType: 'json',
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
            success: function (responses) {
            console.log(responses.data   + " current patiient");
            },
            error: function (err) {
              console.log(err + " error while querying database");
            }
          })
        },
        error: function () {
          
        }
      })
    });
  })
}

function generate_controlNumber(){
  $(function () {
    const randomNumbers = [];

    for (let i = 0; i < 12; i++) {
     const  controlNumber = Math.floor(Math.random() * 10);
     //const  controlNumber = Math.floor(Math.random() * 10) + 1;
     randomNumbers.push(controlNumber)
      
    }
    const numbers = randomNumbers.toString().replaceAll(',',"");
    alert("\npayment reqired \n\ncontrol number\n"+ numbers);   
  })
}