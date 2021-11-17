import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';

import { JhiLanguageHelper } from '../../shared';
import { MockAccountService } from '../../shared/util/test/mock-account.service';
import { MockPrincipal } from '../../shared/util/test/mock-principal.service';
import { ManagementPortalTestModule } from '../../shared/util/test/test.module';
import { Principal, AccountService } from '../../shared';
import { SettingsComponent } from './settings.component';

describe('Component Tests', () => {

    describe('SettingsComponent', () => {

        let comp: SettingsComponent;
        let fixture: ComponentFixture<SettingsComponent>;
        let mockAuth: any;
        let mockPrincipal: any;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ManagementPortalTestModule],
                declarations: [SettingsComponent],
                providers: [
                    {
                        provide: Principal,
                        useClass: MockPrincipal
                    },
                    {
                        provide: AccountService,
                        useClass: MockAccountService
                    },
                    {
                        provide: JhiLanguageHelper,
                        useValue: jasmine.createSpyObj('JhiLanguageHelper', {
                            getAll: Promise.resolve(['en', 'nl']),
                        }),
                    },
                    {
                        provide: TranslateService,
                        useValue: { use() {} }
                    },
                ]
            }).overrideTemplate(SettingsComponent, '').compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SettingsComponent);
            comp = fixture.componentInstance;
            mockAuth = fixture.debugElement.injector.get(AccountService);
            mockPrincipal = fixture.debugElement.injector.get(Principal);
            fixture.detectChanges();
        });

        it('should send the current identity upon save', function() {
            // GIVEN
            const accountValues = {
                firstName: 'John',
                lastName: 'Doe',

                activated: true,
                email: 'john.doe@mail.com',
                langKey: 'en',
                login: 'john'
            };
            mockPrincipal.setResponse(accountValues);

            // WHEN
            comp.settingsAccount = accountValues;
            comp.save();

            // THEN
            expect(mockPrincipal.account$Spy).toHaveBeenCalled();
            expect(mockPrincipal.reset).toHaveBeenCalled();
            expect(mockAuth.save).toHaveBeenCalledWith(accountValues);
            expect(comp.settingsAccount).toEqual(accountValues);
        });

        it('should notify of success upon successful save', function() {
            // GIVEN
            const accountValues = {
                firstName: 'John',
                lastName: 'Doe'
            };
            mockPrincipal.setResponse(accountValues);

            // WHEN
            comp.save();

            // THEN
            expect(comp.error).toBeNull();
            expect(comp.success).toBe('OK');
        });

        it('should notify of error upon failed save', function() {
            // GIVEN
            mockAuth.save.and.returnValue(throwError('ERROR'));

            // WHEN
            comp.save();

            // THEN
            expect(comp.error).toEqual('ERROR');
            expect(comp.success).toBeNull();
        });
    });
});
