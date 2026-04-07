import { Component } from '@angular/core';
import { HomeContent } from '../../components/home-content/home-content';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeContent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
