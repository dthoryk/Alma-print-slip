var loan_table = document.getElementById("TABLE_DATA_loanList");
var button_exists = document.getElementById("alma_print_slip");

if (loan_table && !button_exists) {

var user_name = document.getElementById("pageBeanfullPatronName").innerHTML;
user_name = user_name.replace(/\'/g, "`");
var user_id = document.getElementById("pageBeanuserIDisplay").value;
var library = document.getElementById("locationText").innerHTML;
var rowLength = loan_table.rows.length;
var loan_list = "";

for (var i = 1; i < rowLength; i++) {
 var loan_cells = loan_table.rows.item(i).cells;
 var cellLength = loan_cells.length;
 var col_count = 0;  
 for (var j = 1; j < 5; j++) {

    var loan_text = loan_cells.item(j).innerText;
     
    if (loan_text.length > 0) {
		if(col_count == 0){
			loan_list += "|" + "<b>Title:</b></td><td>" + loan_text + "|";
		}else if (col_count == 1){
			loan_list += "|" + "<b>Due Date:</b></td><td>" + loan_text + "|";		
		}else{
			loan_list += "|" + "<b>Barcode:</b></td><td>" + loan_text + "|";
		}
		col_count += 1;
    }
	loan_list += "\n";
  }

  loan_list += "\n\n";
 }

var loan_list_table = loan_list.replace(/\|\|/g, "</td><td>");
loan_list_table = loan_list_table.replace(/\|\n\n/g, "</td></tr><tr><td>&nbsp;</td></tr>");
loan_list_table = loan_list_table.replace(/\|\n/g, "</td></tr>");
loan_list_table = loan_list_table.replace(/\|/g, "<tr><td>");
loan_list_table = loan_list_table.replace(/\'/g, "`");
loan_list_table = loan_list_table.replace(/\"/g, "``");
loan_list_table = loan_list_table.replace(/CET/g, "");
loan_list_table = loan_list_table.replace(/\n/g, "");
loan_list_table = "<table border=0>" + loan_list_table + "</table>";

// generate date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}

today = mm + '/' + dd + '/' + yyyy;

var header_html ="<html><head><style>body {font-family: Arial, Helvetica, sans-serif; font-size: 70%;} table {border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; font-size: 100%;} </style></head><body>";

var button_name = "Print Slip";

var title = "Loan Receipt";

var institution = "College Name";

var library = "Library Name";

var address = "123 Main St. <br /> Anytown, USA 12345";

var phone = "Phone# 999-999-9999";

var date = "Date "+today;

var footer = "You are responsible for all items listed. Renewals may be made in person or by telephone on or before due date.";


var html_slip = header_html+"<b>"+title+" --- Loan "+date+"</b><br /><br />"+ library +"<br />"+institution+"<br />" + address +"<br />" + phone + "<br /><p>"+user_name+" ("+user_id+")</p>"+loan_list_table+"<br /><br />" + footer + "</body></html>";

var call_javascript = "var slip = window.open('', '_blank','toolbar=no,scrollbars=no,resizable=yes,titlebar=no,menubar=no,top=300,left=500,width=500,height=600'); slip.document.write('"+html_slip+"'); slip.print(); slip.close();";

var print_button = " <button id=\"alma_print_slip\" onclick=\""+call_javascript+"\" style=\"background-color:red; color:white; height: 32px; padding: 6px 12px 6px 12px; border: 1px solid transparent; border-radius:4px\"> <strong>"+button_name+"</strong> </button>";

var button_div = document.getElementById('PAGE_BUTTONS_checkoutpatronworkspacedone');
button_div.insertAdjacentHTML('afterend', print_button);
}
