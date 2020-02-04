import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#navMenu');
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
  }

}
