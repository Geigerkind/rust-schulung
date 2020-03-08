import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {Routing} from './routing';
import {App} from './component/app';
import {NavigationBarModule} from "./module/navigation_bar/module";
import {TranslationService} from "./service/translation";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {LoadingBarService} from "./service/loading_bar";
import {RouterLoadingBarModule} from "./module/router_loading_bar/module";
import {NotificationService} from "./service/notification";
import {LoadingBarInterceptor} from "./service/interceptor/loading_bar";
import {APIService} from "./service/api";
import {NotificationListModule} from "./module/notification_list/module";
import {SettingsService} from "./service/settings";

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [App],
    imports: [
        BrowserModule,
        RouterLoadingBarModule,
        NavigationBarModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        Routing,
        NotificationListModule,
    ],
    providers: [
        LoadingBarService,
        TranslationService,
        NotificationService,
        SettingsService,
        APIService,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingBarInterceptor, multi: true, deps: [LoadingBarService]},
    ],
    bootstrap: [App]
})
export class Module {
}
