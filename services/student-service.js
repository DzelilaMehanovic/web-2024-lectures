const StudentService = {
    init: function () {
        $('#addStudentForm').validate({
            rules: {
                name: 'required',
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 8,
                    maxlength: 20
                }
            },
            messages: {
                name: 'Please enter your name',
                email: {
                    required: 'Please enter your email',
                    email: 'Please enter a valid email address'
                },
                password: {
                    required: 'Please enter a password',
                    minlength: 'Password must be at least 8 characters long',
                    maxlength: 'Password cannot be longer than 20 characters',
                }
            },
            submitHandler: function (form) {
                let student = Object.fromEntries(new FormData(form).entries());
                StudentService.addStudent(student);
                form.reset();
            },
        });
        StudentService.getStudents();
    },

    addStudent: function (student) {
        try {
            $.blockUI({ message: '<h3>Processing...</h3>' });
            toastr.success("Student added successfully")
            $.unblockUI();
        } catch (error) {
            console.error('Error in submitHandler:', error);
            alert('An error occurred. Please try again later.');
            $.unblockUI();
        }
    },

    getStudents : function () {
         $.ajax({
            url: '/web-structure/data/students.json', // Replace 'data.json' with the path to your JSON file
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                /* let html = "<tr><th>Name</th><th>Email</th><th>Password</th></tr>";
                data.forEach(element => {
                    html+='<tr><td>'+element.name+'</td><td>'+element.email+'</td><td>'+element.password+'</td></tr>';
                    <td><button onclick=open_edit_modal('element.id')...
                });
                $("table#students").html(html)*/

                for (var i = 0; i < data.length; i++) {
                    data[i].email = data[i].email ? data[i].email : "-";
                    data[i].edit_student =
                        '<button class="btn btn-danger" onClick="StudentService.openEditModal(' +
                        data[i].id +
                        ')">Edit Student</button>';
                }
                Utils.datatable(
                    "students-table",
                    [
                        { data: "name", title: "Name" },                        
                        { data: "email", title: "Email" },
                        { data: "password", title: "Password" },
                        { data: "edit_student", title: "Edit Student" }
                    ],
                    data
                );
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data from file:', error);
            }
        });
    },

    openEditModal : function (id) {
        $('#editModal').show();
        $.ajax({
            url: '/forms/student_' + id + '.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $.blockUI();
                $('input[name="name"]').val(data.name)
                $('input[name="email"]').val(data.email)
                $('input[name="password"]').val(data.password)
                
                $.unblockUI();
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data from file:', error);
                $.unblockUI();
            }
        });
    },

    closeEditModal : function() {
        $("#editModal").hide();
    },

    edit_student : function(student){
        try {
            $.blockUI({ message: '<h3>Processing...</h3>' });
            toastr.success("Student edited successfully")
            $.unblockUI();
        } catch (error) {
            console.error('Error in submitHandler:', error);
            alert('An error occurred. Please try again later.');
            $.unblockUI();
        }
    }
};