import { Branch } from "../branch.domain";
import { Company } from "../company.domain";
import { Corporative } from "../corporative.domain";
import { CompanyConflictError, CompanyNotFoundError } from "../errors/company.errors";
import { CorporativeForbiddenError } from "../errors/corporative.errors";

describe('Corporative Entity', () => {
    let corporative: Corporative;
    let company: Company;
    let branch: Branch;

    beforeEach(() => {
        corporative = Corporative.create({ name: 'Corporative 1' });

        corporative.addCompany({
            name: 'Company A',
            ruc: '1234567890001',
            address: '123 Main St',
            phone: '123-456-7890'
        });

        corporative.addBranchToCompany({
            companyId: corporative.companies[0].id,
            cityId: 1,
            name: 'Branch A'
        });

        company = corporative.companies[0];
        branch = corporative.companies[0].branches[0];
    });

    it('should get the correct initial state', () => {
        expect(corporative.name).toEqual('Corporative 1');
        expect(corporative.companies).toHaveLength(1);
        expect(company.name).toEqual('Company A');
    });

    it('should rehydrate a corporative', () => {
        const rehydrated = Corporative.rehydrate({
            id: corporative.id,
            name: 'Corporative 1',
            companies: []
        });

        expect(rehydrated.id).toEqual(corporative.id);
        expect(rehydrated.name).toEqual('Corporative 1');
        expect(rehydrated.companies).toHaveLength(0);
    });

    it('should throw an error if tries to remove item with companies', () => {
        expect(() => corporative.remove()).toThrow(CorporativeForbiddenError);
    });


    it('should add a company', () => {
        corporative.addCompany({
            name: 'Company B',
            ruc: '0987654321001',
            address: '456 Secondary St',
            phone: '987-654-3210'
        });

        expect(corporative.companies).toHaveLength(2);
        expect(corporative.companies[1].name).toEqual('Company B');
    });

    it('should throw error when adding a company with duplicate RUC', () => {
        expect(() => {
            corporative.addCompany({
                name: 'Company C',
                ruc: '1234567890001',
                address: '789 Another St',
                phone: '111-222-3333'
            });
        }).toThrow(CompanyConflictError);
    });

    it('should remove a company', () => {
        corporative.removeBranchFromCompany({ branchId: branch.id, companyId: company.id });
        corporative.removeCompany(company.id);
        expect(corporative.companies).toHaveLength(0);
    });

    it('should throw error when removing a company with branches', () => {
        expect(() => {
            corporative.removeCompany(company.id);
        }).toThrow(CompanyNotFoundError);
    });

    it('should throw error when removing a invalid company', () => {
        expect(() => {
            corporative.removeCompany('invalid-company-id');
        }).toThrow(CompanyNotFoundError);
    });

    it('should move a company to another corporative', () => {
        const targetCorporative = Corporative.create({ name: 'Corporative 2' });

        corporative.moveCompanyTo(targetCorporative, company.id);

        expect(corporative.companies).toHaveLength(0);
        expect(targetCorporative.companies).toHaveLength(1);
        expect(targetCorporative.companies[0].name).toEqual('Company A');
    });

    it('should throw error when moving a non-existing company', () => {
        const targetCorporative = Corporative.create({ name: 'Corporative 2' });

        expect(() => {
            corporative.moveCompanyTo(targetCorporative, 'non-existing-company-id');
        }).toThrow(CompanyNotFoundError);
    });

    it('should add a branch to a company', () => {
        corporative.addBranchToCompany({
            companyId: company.id,
            name: 'Branch B',
            cityId: 2
        });

        expect(company.branches).toHaveLength(2);
        expect(company.branches[1].name).toEqual('Branch B');
    });

    it('should throw error when adding a branch to a non-existing company', () => {
        expect(() => {
            corporative.addBranchToCompany({
                companyId: 'non-existing-company-id',
                name: 'Branch C',
                cityId: 3
            });
        }).toThrow(CompanyNotFoundError);
    });

    it('should remove a branch from a company', () => {
        corporative.removeBranchFromCompany({
            companyId: company.id,
            branchId: branch.id
        });

        expect(company.branches).toHaveLength(0);
    });

    it('should throw error when removing a branch from a non-existing company', () => {
        expect(() => {
            corporative.removeBranchFromCompany({
                companyId: 'non-existing-company-id',
                branchId: 'non-existing-branch-id'
            });
        }).toThrow(CompanyNotFoundError);
    });

    it('should move a branch between companies', () => {
        corporative.addCompany({
            name: 'Company B',
            ruc: '0987654321001',
            address: '456 Secondary St',
            phone: '987-654-3210'
        });

        const companyB = corporative.companies[1];

        corporative.moveBranchTo(corporative, {
            fromCompanyId: company.id,
            toCompanyId: companyB.id,
            branchId: branch.id
        });

        expect(company.branches).toHaveLength(0);
        expect(companyB.branches).toHaveLength(1);
        expect(companyB.branches[0].name).toEqual(branch.name);
    });

    it('should throw error when moving a branch to a non-existing company', () => {
        expect(() => {
            corporative.moveBranchTo(corporative, {
                fromCompanyId: company.id,
                toCompanyId: 'non-existing-company-id',
                branchId: branch.id
            });
        }).toThrow(CompanyNotFoundError);
    });
});
