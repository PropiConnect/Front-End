import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    TranslateModule // Importa el módulo de traducción
  ],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'] // Corregido styleUrl -> styleUrls
})
export class LanguageSwitcherComponent {
  protected currentLang: string = 'en';
  protected languages: string[] = ['en', 'es'];

  constructor(private translate: TranslateService) {
    // Configurar 'en' como dioma predeterminado
    const defaultLang = 'en';
    this.translate.setDefaultLang(defaultLang);

    // Configurar el idioma actual con el idioma seleccionado y si no hay cambios manetner el predeterminado
    const browserLang = this.translate.getBrowserLang() || defaultLang;
    this.translate.use(browserLang);
    this.currentLang = this.translate.currentLang || browserLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
  }
}
