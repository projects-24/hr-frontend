import 'table2excel';
export default function Excel({trigger}) {
    if(trigger){
        const Table2Excel = window.Table2Excel;
        const table2excel = new Table2Excel();
        table2excel.export(document.querySelector("#records"));
    }
}
