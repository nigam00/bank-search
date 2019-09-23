import { Component, OnInit } from '@angular/core';
import { ApiService } from './apiService';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor( private apiService : ApiService){}

  bankDetails;
  entries=10;
  currentPage=1;
totalRecords=0;
displayBankDetails;
ifsc:String="";
bankId:String=""
branch:String=""
address:String=""
city:String=""
district:String="";
state:String="";
selectedCity:String="MUMBAI";
bankName:String="";

overlay:boolean;

	ngOnInit() {

	this.getBankList()
	}
//get the bank list also cache the api call if newly called
	getBankList(){
		this.overlay=true;
		var url="https://vast-shore-74260.herokuapp.com/banks?city="+this.selectedCity;

				if(localStorage.getItem(url)!=null){
		this.bankDetails=JSON.parse(localStorage.getItem(url))
				    		this.displayBankDetails = JSON.parse(localStorage.getItem(url))
		this.totalRecords=this.bankDetails.length;
		this.overlay=false;
				}
		else{

				    this.apiService.getRequest(url).subscribe(
				    	(res) => {
				    		this.bankDetails=res.json()
				    		this.displayBankDetails = res.json()
							this.totalRecords=this.bankDetails.length;
							localStorage.setItem(url, JSON.stringify(res.json()));
							this.overlay=false;},
						(err)=>{})
		}
	}
//function called when city is changes
	onCityChange(event){
		this.ifsc="";
		this.bankName=""
		this.bankId=""
		this.city=""
		this.district=""
		this.address=""
		this.state=""
		this.branch=""
		this.selectedCity=event;
		this.currentPage=1;
		this.entries=10;
		this.getBankList();
	}
	//function to show next page button
	nextplus(){
		return this.totalRecords/Number(this.entries) > Number(this.currentPage)
	}
	//function to show previous page button	
	nextminus(){
		return Number(this.currentPage) > 1
	}
//function called when we click on next page
	nextpage(input){
		if(input=='-')
			this.currentPage--;
		else
			this.currentPage++;
	}
//function to do the filtering for any of the bank fields
	filter(event){
		this.displayBankDetails=this.bankDetails;
		this.displayBankDetails=this.displayBankDetails.filter(entry=>{
			if(entry.ifsc.toLowerCase().includes(this.ifsc.toLowerCase().trim()) 
				&& entry.bank_id.toString().trim().toLowerCase().trim().includes(this.bankId.toLowerCase().trim()) 
				&& entry.branch.toLowerCase().trim().includes(this.branch.toLowerCase().trim()) 
				&& entry.address.toLowerCase().trim().includes(this.address.toLowerCase().trim())
				&& entry.city.toLowerCase().trim().includes(this.city.toLowerCase().trim())
				&& entry.district.toLowerCase().trim().includes(this.district.toLowerCase().trim())
				&& entry.state.toLowerCase().trim().includes(this.state.toLowerCase().trim())
				&& entry.bank_name.toLowerCase().trim().includes(this.bankName.toLowerCase().trim()))
				return true
		});
		this.totalRecords=this.displayBankDetails.length;
	}
//favourites addition
	onClickCheckBox(event,i,data){
		 if (event.target.checked) {
		 	if(localStorage.getItem('fav')!=null){
		 		var fav=JSON.parse(localStorage.getItem('fav'))
		 		fav.push(data);
		 		fav=Array.from(new Set(fav));
                localStorage.setItem("fav", JSON.stringify(fav));
		 	}
		 	else{
		 		var uniqueFav=[];
		 		uniqueFav.push(data);
		 		localStorage.setItem("fav", JSON.stringify(uniqueFav));
		 	}
      		
   		}
   		else{
		 		var fav=JSON.parse(localStorage.getItem('fav'))
		 		fav=fav.filter(entry=>entry!=data);
                localStorage.setItem("fav", JSON.stringify(fav));
   		}
	}
//to check if any bank is marked as fav
	checkIfFav(data){
		var fav=JSON.parse(localStorage.getItem('fav'))
		if(fav!=null)
		if(fav.indexOf(data)!=-1)return true;
		return false;
	}

}
