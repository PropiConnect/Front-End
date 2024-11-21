import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {ToolbarComponent} from "../../../public/pages/toolbar/toolbar.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [NgIf, ToolbarComponent, MatIcon, MatIconButton, MatButton, FormsModule],
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {
  user: User | null = null;
  isEditing: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('userId');

    if (userId) {
      this.userService.getUserById(Number(userId)).then(user => {
        if (user) {
          console.log('User data fetched:', user);
          this.user = { ...user, id: Number(userId) };
        } else {
          console.error('No se pudo cargar el usuario.');
        }
      }).catch(error => {
        console.error('Error al obtener el usuario:', error);
      });
    } else {
      console.error('No se encontró el userId');
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.user) {
      if (!this.user.id) {
        console.error('El ID del usuario está ausente. No se puede proceder con la actualización.');
        return;
      }

      this.userService.updateUser(this.user.id, this.user).then(updatedUser => {
        this.user = updatedUser;
        this.isEditing = false;
        console.log('Usuario actualizado correctamente');
      }).catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
    }
  }



}
