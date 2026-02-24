"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMasterData = void 0;
const InsuranceCompany_1 = require("../models/master/InsuranceCompany");
const PolicyType_1 = require("../models/master/PolicyType");
const VehicleType_1 = require("../models/master/VehicleType");
const RTO_1 = require("../models/master/RTO");
/**
 * Seed global master data (tenantId = null)
 * These become available to all tenants
 */
const seedMasterData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🌱 Seeding master data...");
        // Insurance Companies (Global)
        const companies = [
            { name: "HDFC ERGO", shortCode: "HDFC", isActive: true },
            { name: "ICICI Lombard", shortCode: "ICICI", isActive: true },
            { name: "Bajaj Allianz", shortCode: "BAJ", isActive: true },
            { name: "New India Assurance", shortCode: "NIA", isActive: true },
            { name: "United India Insurance", shortCode: "UII", isActive: true },
            { name: "Tata AIG", shortCode: "TATA", isActive: true },
            { name: "Reliance General", shortCode: "RGEN", isActive: true },
            { name: "SBI General", shortCode: "SBI", isActive: true },
            { name: "Cholamandalam", shortCode: "CHO", isActive: true },
            { name: "Royal Sundaram", shortCode: "RS", isActive: true },
        ];
        for (const company of companies) {
            const exists = yield InsuranceCompany_1.InsuranceCompany.findOne({
                name: company.name,
                tenantId: null,
            });
            if (!exists) {
                yield InsuranceCompany_1.InsuranceCompany.create({
                    tenantId: null,
                    name: company.name,
                    shortCode: company.shortCode,
                    active: company.isActive,
                });
                console.log(`  ✓ Created: ${company.name}`);
            }
            else {
                console.log(`  - Already exists: ${company.name}`);
            }
        }
        // Policy Types (Global)
        const policyTypes = [
            {
                category: "motor",
                name: "Motor Insurance",
                code: "MOT",
            },
            {
                category: "health",
                name: "Health Insurance",
                code: "HEA",
            },
            {
                category: "life",
                name: "Life Insurance",
                code: "LIF",
            },
            {
                category: "non-motor",
                name: "Fire Insurance",
                code: "FIR",
            },
            {
                category: "non-motor",
                name: "Marine Insurance",
                code: "MAR",
            },
            {
                category: "non-motor",
                name: "Travel Insurance",
                code: "TRA",
            },
        ];
        for (const policyType of policyTypes) {
            const exists = yield PolicyType_1.PolicyType.findOne({
                category: policyType.category,
                tenantId: null,
            });
            if (!exists) {
                yield PolicyType_1.PolicyType.create({
                    tenantId: null,
                    name: policyType.name,
                    category: policyType.category,
                    code: policyType.code,
                });
                console.log(`  ✓ Created: ${policyType.name}`);
            }
            else {
                console.log(`  - Already exists: ${policyType.category}`);
            }
        }
        // Vehicle Types (Global)
        const vehicleTypes = [
            { name: "Two Wheeler", code: "2W" },
            { name: "Car", code: "CAR" },
            { name: "Commercial Vehicle", code: "CV" },
            { name: "Truck", code: "TRUCK" },
            { name: "Bus", code: "BUS" },
            { name: "Bike", code: "BIKE" },
        ];
        for (const vehicleType of vehicleTypes) {
            const exists = yield VehicleType_1.VehicleType.findOne({
                name: vehicleType.name,
                tenantId: null,
            });
            if (!exists) {
                yield VehicleType_1.VehicleType.create({
                    tenantId: null,
                    name: vehicleType.name,
                    code: vehicleType.code,
                });
                console.log(`  ✓ Created: ${vehicleType.name}`);
            }
            else {
                console.log(`  - Already exists: ${vehicleType.name}`);
            }
        }
        // RTOs (Global)
        const rtos = [
            { code: "DL01", location: "Delhi (East)", state: "Delhi" },
            { code: "DL02", location: "Delhi (West)", state: "Delhi" },
            { code: "MH01", location: "Mumbai (East)", state: "Maharashtra" },
            { code: "MH02", location: "Mumbai (West)", state: "Maharashtra" },
            { code: "KA01", location: "Bangalore", state: "Karnataka" },
            { code: "TG01", location: "Hyderabad", state: "Telangana" },
        ];
        for (const rto of rtos) {
            const exists = yield RTO_1.RTO.findOne({
                code: rto.code,
                tenantId: null,
            });
            if (!exists) {
                yield RTO_1.RTO.create({
                    tenantId: null,
                    code: rto.code,
                    location: rto.location,
                    state: rto.state,
                });
                console.log(`  ✓ Created: ${rto.code} - ${rto.location}`);
            }
            else {
                console.log(`  - Already exists: ${rto.code}`);
            }
        }
        console.log("✅ Master data seeding completed!");
    }
    catch (error) {
        console.error("❌ Error seeding master data:", error);
        throw error;
    }
});
exports.seedMasterData = seedMasterData;
