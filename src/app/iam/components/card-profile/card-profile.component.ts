import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID from route:', userId); // Para verificar si el ID está llegando

    if (userId) {
      this.userService.getUserById(userId).then(user => {
        console.log('User data:', user); // Verifica si se está obteniendo el usuario
        this.user = user;
      });
    }
  }
}
