import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CasinoGameListComponent } from './casino-game-list/casino-game-list.component';
import { CasinoGameComponent } from './casino-game-list/casino-game/casino-game.component';
import { OrderedMenuLabelsPipe } from './header/ordered-menu-labels.pipe';
import { TopNewRibbonDirective } from './casino-game-list/casino-game/top-new-ribbon.directive';
import { MenuLabelPipe } from './header/menu-label.pipe';
import { MenuDirective } from './header/menu.directive';
import { LoadingComponent } from './loading/loading.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CasinoGameListComponent,
    CasinoGameComponent,
    OrderedMenuLabelsPipe,
    MenuLabelPipe,
    TopNewRibbonDirective,
    MenuDirective,
    LoadingComponent,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
