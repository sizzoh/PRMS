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
        window.location = "/home";
      }
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
                 loginUser.append("Patient");
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
                 staff[j]["fields"].name === name ||
                 staff[j]["fields"].role === "Doctor"
               ) {
                 loginUser.append("Doctor");
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
                 loginUser.append("Receptionist");
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
                 loginUser.append("Accountant");
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
                 loginUser.append("Lab Technician");
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
                 loginUser.append("Admin");
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
        success: function (response) { },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    });
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
            alert("function has been called");
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
            console.log(data);
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
        success: function () {
          
        },
        error: function () {
          
        }
      })
    });
  })
}