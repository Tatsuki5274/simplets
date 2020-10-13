const cgql = require('./customGraphql')

exports.getMessage = async (sheetId) => {
    const sheet = await cgql.getEmployeesEmail(sheetId)
    let superiors = [];
    const reviewee = sheet.revieweeEmployee;
    let emp = sheet.revieweeEmployee.superior;
    do{
        superiors.push(emp);
        emp = emp.superior;
    }while(emp)
    
    let message = {
        1: {
            "proceed": {
                "to": [superiors[0].email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        },
        2: {
            "proceed": {
                "to": [reviewee.email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            },
            "remand": {
                "to": [reviewee.email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        },
        3: {
            "proceed": {
                "to": [superiors[0].email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            },
            "remand": {
                "to": [reviewee.email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        },
        10: {
            "proceed": {
                "to": [reviewee.email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            },
            "remand": {
                "to": [reviewee.email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        },
        11: {
            "proceed": {
                "to": [superiors[0]],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            },
            "remand": {
                "to": [reviewee.email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        },
        12: {
            "proceed": {
                "to": [superiors[1].email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        },
        13: {
            "proceed": {
                "to": [superiors[superiors.length-1].email],
                "cc": [""],
                "bcc": [""],
                "subject": "",
                "body": ""
            }
        }
    };

    return message;
}