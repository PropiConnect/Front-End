import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {ToolbarComponent} from "../../../public/pages/toolbar/toolbar.component";

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [NgIf, ToolbarComponent],
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // Obtener userId desde localStorage si no está en la URL
    let userId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('userId');

    if (userId) {
      console.log('User ID:', userId);
      this.userService.getUserById(Number(userId)).then(user => {
        console.log('User data:', user);
        this.user = user;
      });
    } else {
      console.error('No se encontró el userId');
    }
  }

}
