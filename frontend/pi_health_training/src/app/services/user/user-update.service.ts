import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user.model';
import { HttpClient } from '@angular/common/http';
import { UserReadService } from './user-read.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(
    private http: HttpClient,
    private userReadService: UserReadService) { }

  async update(id: number, fullName: string) {
    let userToUpdate: User = await this.userReadService.findById(id);
    if (userToUpdate == null) {
      throw new Error('usuario nao encontrado');
    }
    userToUpdate.fullName = fullName;
    return await firstValueFrom(this.http.put(`http://localhost:8081/user/${id}`, userToUpdate));
  }

  async updatePassword(id: number, oldPassword: string, newPassword: string) {
    let userToUpdate: User = await this.userReadService.findById(id);
    if (userToUpdate == null) {
      throw new Error('usuario nao encontrado');
    }

    if (oldPassword !== userToUpdate.password) {
      throw new Error('senha antiga invalida');
    }

    let data = {
      password: newPassword
    };

    return await firstValueFrom(this.http.patch(`http://localhost:8081/user/${id}`, data));
  }

}
