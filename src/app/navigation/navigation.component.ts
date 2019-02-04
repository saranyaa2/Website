import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Location } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import * as $ from 'jquery';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menu: any;
	isloggedIn: boolean; 
	database = 'menu';
	menuOpen: boolean;

	constructor(private location: Location,
		private config: ConfigService,
	  private auth: AuthenticationService) { }

  ngOnInit() {

		this.getMenu(this.database);
		this.menuOpen = false;

  }

getMenu(database){
	
	this.config.getSettings(database).subscribe(
		settings => {
			 this.menu = settings;
			 console.log(settings);
	  	}
		); 
}

toggleMenu(state) {

	this.menuOpen = state;

}

  logout() {
    this.auth.logout();
  }
}

