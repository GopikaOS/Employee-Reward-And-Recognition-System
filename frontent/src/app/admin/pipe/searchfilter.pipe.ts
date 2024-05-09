import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'searchFilter',
  standalone:true
})
export class SearchFilterPipe implements PipeTransform {


  transform(value?: [], args?: any, searchKeys?:any[]): never[] {
    if (!value) {
      return [];
    }
    if (!args) {
      return value;
    }
    args = args?.toLowerCase()?.trim();
    if (searchKeys) {
      // data varying and hence used data type any
      return value?.filter((data:any) => {
        let searchString = '';
        // key varying and hence used data type any
        searchKeys?.forEach((key:string | any) => {

            // data key ->values -> stringfy -> then bind it to the search string and then return
            
          searchString = `${searchString} ${JSON.stringify(data?.[key])}`;
        });
        return searchString?.toLowerCase()?.includes(args);
      });
    }
    return value?.filter((data:any) => JSON.stringify(data)?.toLowerCase()?.includes(args));

  }

}