import dateFormat from "dateformat";

export const formatAWSDate = (date: Date): string =>{
    return dateFormat(date, "yyyy-mm-dd-HH:MM");
}