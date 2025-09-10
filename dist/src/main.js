/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const squid_node_module_1 = __webpack_require__(/*! @/modules/squid-node.module */ "./src/modules/squid-node.module.ts");
const redis_module_1 = __webpack_require__(/*! @/common/libs/redis/redis.module */ "./src/common/libs/redis/redis.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            redis_module_1.RedisModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    database: 10,
                    host: 'redis',
                    port: 6379,
                    password: config.get('REDIS_PASSWORD'),
                }),
            }),
            squid_node_module_1.SquidNodeModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);


/***/ }),

/***/ "./src/common/exceptions/http-exeception-with-error-code.type.ts":
/*!***********************************************************************!*\
  !*** ./src/common/exceptions/http-exeception-with-error-code.type.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionWithErrorCodeType = void 0;
const http_exception_1 = __webpack_require__(/*! @nestjs/common/exceptions/http.exception */ "@nestjs/common/exceptions/http.exception");
class HttpExceptionWithErrorCodeType extends http_exception_1.HttpException {
    errorCode;
    constructor(message, errorCode, statusCode) {
        super(message, statusCode);
        this.errorCode = errorCode;
    }
}
exports.HttpExceptionWithErrorCodeType = HttpExceptionWithErrorCodeType;


/***/ }),

/***/ "./src/common/exceptions/index.ts":
/*!****************************************!*\
  !*** ./src/common/exceptions/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./http-exeception-with-error-code.type */ "./src/common/exceptions/http-exeception-with-error-code.type.ts"), exports);


/***/ }),

/***/ "./src/common/helpers/error-handler.helper.ts":
/*!****************************************************!*\
  !*** ./src/common/helpers/error-handler.helper.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorHandler = errorHandler;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const constants_1 = __webpack_require__(/*! @contract/constants */ "./src/contracts/constants/index.ts");
const exceptions_1 = __webpack_require__(/*! @/common/exceptions */ "./src/common/exceptions/index.ts");
function errorHandler(response) {
    if (response.success) {
        if (!response.response) {
            throw new common_1.InternalServerErrorException('No data returned');
        }
        return response.response;
    }
    else {
        if (!response.code) {
            throw new common_1.InternalServerErrorException('Unknown error');
        }
        const errorObject = Object.values(constants_1.ERRORS).find((error) => error.code === response.code);
        if (!errorObject) {
            throw new common_1.InternalServerErrorException('Unknown error');
        }
        throw new exceptions_1.HttpExceptionWithErrorCodeType(errorObject.message, errorObject.code, errorObject.httpCode);
    }
}


/***/ }),

/***/ "./src/common/libs/redis/redis.module-definition.ts":
/*!**********************************************************!*\
  !*** ./src/common/libs/redis/redis.module-definition.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MODULE_OPTIONS_TOKEN = exports.ConfigurableModuleClass = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
_a = new common_1.ConfigurableModuleBuilder().build(), exports.ConfigurableModuleClass = _a.ConfigurableModuleClass, exports.MODULE_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN;


/***/ }),

/***/ "./src/common/libs/redis/redis.module.ts":
/*!***********************************************!*\
  !*** ./src/common/libs/redis/redis.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const redis_service_1 = __webpack_require__(/*! ./redis.service */ "./src/common/libs/redis/redis.service.ts");
const redis_module_definition_1 = __webpack_require__(/*! ./redis.module-definition */ "./src/common/libs/redis/redis.module-definition.ts");
let RedisModule = class RedisModule extends redis_module_definition_1.ConfigurableModuleClass {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [redis_service_1.RedisService],
        exports: [redis_service_1.RedisService],
    })
], RedisModule);


/***/ }),

/***/ "./src/common/libs/redis/redis.service.ts":
/*!************************************************!*\
  !*** ./src/common/libs/redis/redis.service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisService = void 0;
const redis_1 = __webpack_require__(/*! redis */ "redis");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const redis_module_definition_1 = __webpack_require__(/*! ./redis.module-definition */ "./src/common/libs/redis/redis.module-definition.ts");
let RedisService = class RedisService {
    options;
    _client;
    _logger = new common_1.Logger('RedisService');
    constructor(options) {
        this.options = options;
        this._client = (0, redis_1.createClient)({
            url: `redis://${options.host}:${options.port}`,
            database: options.database,
            username: options.username,
            password: options.password,
        });
        this._client.connect()
            .then(() => {
            this._logger.log('REDIS CONNECTED');
        }).catch((error) => {
            this._logger.error('REDIS CONNECTION ERROR');
            this._logger.error(error);
            return Promise.reject(error);
        });
    }
    get client() {
        return this._client;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_module_definition_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object])
], RedisService);


/***/ }),

/***/ "./src/common/utils/is-development.ts":
/*!********************************************!*\
  !*** ./src/common/utils/is-development.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isDevelopment = isDevelopment;
function isDevelopment() {
    return process.env.NODE_ENV === 'development';
}


/***/ }),

/***/ "./src/contracts/api/controllers/index.ts":
/*!************************************************!*\
  !*** ./src/contracts/api/controllers/index.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./users */ "./src/contracts/api/controllers/users.ts"), exports);


/***/ }),

/***/ "./src/contracts/api/controllers/users.ts":
/*!************************************************!*\
  !*** ./src/contracts/api/controllers/users.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USERS_ROUTES = exports.USERS_CONTROLLER = void 0;
exports.USERS_CONTROLLER = 'users';
exports.USERS_ROUTES = {
    POST: 'post',
    ADD: 'add',
    REMOVE: 'REMOVE',
};


/***/ }),

/***/ "./src/contracts/api/index.ts":
/*!************************************!*\
  !*** ./src/contracts/api/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./controllers */ "./src/contracts/api/controllers/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./routes */ "./src/contracts/api/routes.ts"), exports);


/***/ }),

/***/ "./src/contracts/api/routes.ts":
/*!*************************************!*\
  !*** ./src/contracts/api/routes.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.REST_API = exports.ROOT = void 0;
const CONTROLLERS = __importStar(__webpack_require__(/*! ./controllers */ "./src/contracts/api/controllers/index.ts"));
exports.ROOT = '/node';
exports.REST_API = {
    USERS: {
        POST: `${exports.ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.POST}`,
        ADD: `${exports.ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.ADD}`,
        REMOVE: `${exports.ROOT}/${CONTROLLERS.USERS_CONTROLLER}/${CONTROLLERS.USERS_ROUTES.REMOVE}`,
    }
};


/***/ }),

/***/ "./src/contracts/commands/index.ts":
/*!*****************************************!*\
  !*** ./src/contracts/commands/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./users */ "./src/contracts/commands/users/index.ts"), exports);


/***/ }),

/***/ "./src/contracts/commands/users/add-user.contract.ts":
/*!***********************************************************!*\
  !*** ./src/contracts/commands/users/add-user.contract.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddUserContract = void 0;
const zod_1 = __webpack_require__(/*! zod */ "zod");
const api_1 = __webpack_require__(/*! @/contracts/api */ "./src/contracts/api/index.ts");
var AddUserContract;
(function (AddUserContract) {
    AddUserContract.url = api_1.REST_API.USERS.ADD;
    AddUserContract.RequestSchema = zod_1.z.object({
        id: zod_1.z.uuid(),
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    AddUserContract.ResponseSchema = zod_1.z.object({
        response: zod_1.z.object({
            success: zod_1.z.boolean(),
            error: zod_1.z.string().nullable(),
        }),
    });
})(AddUserContract || (exports.AddUserContract = AddUserContract = {}));


/***/ }),

/***/ "./src/contracts/commands/users/index.ts":
/*!***********************************************!*\
  !*** ./src/contracts/commands/users/index.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./post-users.contract */ "./src/contracts/commands/users/post-users.contract.ts"), exports);
__exportStar(__webpack_require__(/*! ./add-user.contract */ "./src/contracts/commands/users/add-user.contract.ts"), exports);
__exportStar(__webpack_require__(/*! ./remove-user.contract */ "./src/contracts/commands/users/remove-user.contract.ts"), exports);


/***/ }),

/***/ "./src/contracts/commands/users/post-users.contract.ts":
/*!*************************************************************!*\
  !*** ./src/contracts/commands/users/post-users.contract.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostUsersContract = void 0;
const zod_1 = __webpack_require__(/*! zod */ "zod");
const api_1 = __webpack_require__(/*! @/contracts/api */ "./src/contracts/api/index.ts");
var PostUsersContract;
(function (PostUsersContract) {
    PostUsersContract.url = api_1.REST_API.USERS.POST;
    const User = zod_1.z.object({
        id: zod_1.z.uuid(),
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    PostUsersContract.RequestSchema = zod_1.z.object({
        data: zod_1.z.array(User),
    });
    PostUsersContract.ResponseSchema = zod_1.z.object({
        response: zod_1.z.object({
            success: zod_1.z.boolean(),
            error: zod_1.z.string().nullable(),
        }),
    });
})(PostUsersContract || (exports.PostUsersContract = PostUsersContract = {}));


/***/ }),

/***/ "./src/contracts/commands/users/remove-user.contract.ts":
/*!**************************************************************!*\
  !*** ./src/contracts/commands/users/remove-user.contract.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveUserContract = void 0;
const zod_1 = __webpack_require__(/*! zod */ "zod");
const api_1 = __webpack_require__(/*! @/contracts/api */ "./src/contracts/api/index.ts");
var RemoveUserContract;
(function (RemoveUserContract) {
    RemoveUserContract.url = api_1.REST_API.USERS.REMOVE;
    RemoveUserContract.RequestSchema = zod_1.z.object({
        username: zod_1.z.string(),
    });
    RemoveUserContract.ResponseSchema = zod_1.z.object({
        response: zod_1.z.object({
            success: zod_1.z.boolean(),
            error: zod_1.z.string().nullable(),
        }),
    });
})(RemoveUserContract || (exports.RemoveUserContract = RemoveUserContract = {}));


/***/ }),

/***/ "./src/contracts/constants/errors/errors.ts":
/*!**************************************************!*\
  !*** ./src/contracts/constants/errors/errors.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERRORS = void 0;
exports.ERRORS = {
    INTERNAL_SERVER_ERROR: { code: 'A001', message: 'Server error', httpCode: 500 },
    UNAUTHORIZED: { code: 'A003', message: 'Unauthorized', httpCode: 401 },
};


/***/ }),

/***/ "./src/contracts/constants/errors/index.ts":
/*!*************************************************!*\
  !*** ./src/contracts/constants/errors/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./errors */ "./src/contracts/constants/errors/errors.ts"), exports);


/***/ }),

/***/ "./src/contracts/constants/index.ts":
/*!******************************************!*\
  !*** ./src/contracts/constants/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./errors */ "./src/contracts/constants/errors/index.ts"), exports);


/***/ }),

/***/ "./src/contracts/index.ts":
/*!********************************!*\
  !*** ./src/contracts/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./api */ "./src/contracts/api/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./commands */ "./src/contracts/commands/index.ts"), exports);


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const express_1 = __webpack_require__(/*! express */ "express");
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
const compression_1 = __importDefault(__webpack_require__(/*! compression */ "compression"));
const nestjs_zod_1 = __webpack_require__(/*! nestjs-zod */ "nestjs-zod");
const winston_1 = __importStar(__webpack_require__(/*! winston */ "winston"));
const nest_winston_1 = __webpack_require__(/*! nest-winston */ "nest-winston");
const app_module_1 = __webpack_require__(/*! @/app.module */ "./src/app.module.ts");
const is_development_1 = __webpack_require__(/*! @/common/utils/is-development */ "./src/common/utils/is-development.ts");
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }), winston_1.default.format.align(), nest_winston_1.utilities.format.nestLike('', {
        colors: true,
        prettyPrint: true,
        processId: false,
        appName: false,
    })),
    level: (0, is_development_1.isDevelopment)() ? 'debug' : 'info',
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            instance: logger,
        }),
    });
    app.use((0, express_1.json)({ limit: '1000mb' }));
    app.use((0, compression_1.default)());
    const config = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    if ((0, is_development_1.isDevelopment)()) {
        app.use((0, morgan_1.default)('short'));
    }
    app.useGlobalPipes(new nestjs_zod_1.ZodValidationPipe());
    await app.listen(Number(config.getOrThrow('APP_PORT')));
    app.enableShutdownHooks();
}
bootstrap();
var fl = {
    "nodeCertPem": "-----BEGIN CERTIFICATE-----\nMIIBmDCCAT+gAwIBAgIHAXV0hAUGKDAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgw\nQmtXLVMwMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDkx\nMDA2MDA1MFoXDTI4MDkxMDA2MDA1MFowOTE3MDUGA1UEAxMuU0hCQzFMZUU4ZkVE\nN1RjckhoQnFiZFo2dmpvM2FVaGZyd2twU2N0cEt1b25KVTBZMBMGByqGSM49AgEG\nCCqGSM49AwEHA0IABE2mhJ6yt5ro1priJpZ0kwN4ourjNB6Ym43o6mkTT+WNLpuR\nCUpCDTCqaiiZoVBpaXY+N2+dFtx36/E/Ob1S8/GjODA2MAwGA1UdEwEB/wQCMAAw\nDgYDVR0PAQH/BAQDAgWgMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMBMAoGCCqGSM49\nBAMCA0cAMEQCIGuOIMyruC7tJTzk776HenfCgqJhnQIj9ZyfM8EGJpLwAiBftXmt\nXlESANg3+HSA5ExrKvrOpNOzocXGihDv/zEqmQ==\n-----END CERTIFICATE-----",
    "nodeKeyPem": "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgJ3/fBG2svUrcqZ65\ns/iZOHBO3AsIHX1g/pCThIvVMmWhRANCAARNpoSesrea6Naa4iaWdJMDeKLq4zQe\nmJuN6OppE0/ljS6bkQlKQg0wqmoomaFQaWl2PjdvnRbcd+vxPzm9UvPx\n-----END PRIVATE KEY-----",
    "caCertPem": "-----BEGIN CERTIFICATE-----\nMIIBeDCCAR6gAwIBAgIBATAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgwQmtXLVMw\nMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDUwNjA4MzEw\nOFoXDTM1MDUwNjA4MzEwOFowMzExMC8GA1UEAwwoMEJrVy1TMDBzMmMtVnRnY2ZF\nLWpaUF9UMktDSzRiZXUwanVWcHhlNzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IA\nBFNG89j0CsnrXF/rRQRi+WAuGOIelNmyTyRbDT3UJXSOAzqOzJcTeHa2ZMHJJmn8\nWggJYBJOSHiUGCkbdFm1FYKjIzAhMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/\nBAQDAgKEMAoGCCqGSM49BAMCA0gAMEUCIEUWZGdKTy4N9EitR9AXoHs/a5jMEhJa\nGprWg1APvDa5AiEA6EShK6gsJheI8RLxVlyWBAZYzm17E5DeTneN/pIEu9o=\n-----END CERTIFICATE-----",
    "jwtPublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo0Dfk7MD894PJ5kxGISY\nfy8Q2MZik8shs+A/4+KhaUrKVjHbKp98Nkix/PqZdQ5BgzI6ZFmpsh1Ma73MreJV\nTIlXzhKzWgio6HcJpdNiheem8xfIdW/4DC+wZCxLgat3JjqXFtTeBibWNPQRrznn\niCPVfzIwhVYEvaajxnUJOtRlsvow2suSimvihxJyNTQlN0FdEzdN/kw4dtarVSDV\npicMEw3+iJv3JH4UAz+Fz4vmLzT9TniMOmC0J1cco9Z6SNAqYMKBQmD3Wx7VM8SV\nYTLfF6JaY8e7/qjkUpeBjvCGPMQW1oIVLb2O5Xfc/YYLuD/2MTfMz0sV6H1M66wt\nTwIDAQAB\n-----END PUBLIC KEY-----\n",
};
var de = {
    "nodeCertPem": "-----BEGIN CERTIFICATE-----\nMIIBgjCCASmgAwIBAgIHAXV0hAVXRDAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgw\nQmtXLVMwMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDkx\nMDA2MDA1NVoXDTI4MDkxMDA2MDA1NVowIzEhMB8GA1UEAxMYUkRrbWFjc01vZ05j\nUnpRWXRTYVQyeC1IMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE0wTRnUB/96ID\n2Ws8LCquJ0+EdiHrBOA9+elKpgg6luHCJMMq1SplprudNDcjvc9YcGET7fAoifaR\nahNJX3PxrqM4MDYwDAYDVR0TAQH/BAIwADAOBgNVHQ8BAf8EBAMCBaAwFgYDVR0l\nAQH/BAwwCgYIKwYBBQUHAwEwCgYIKoZIzj0EAwIDRwAwRAIgWWyyaj8hgoXDY/1B\nk8XROXczztUGiqIrFUNkvMqHZysCICZJc4rNqjxFDoiZDpR4rdlM6JOzWbMbNU27\n6S0P9mPW\n-----END CERTIFICATE-----",
    "nodeKeyPem": "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg20nr7bn2mb7ZcoHr\nHA+6tF7g6zafTSsq1NXW6oEfKaKhRANCAATTBNGdQH/3ogPZazwsKq4nT4R2IesE\n4D356UqmCDqW4cIkwyrVKmWmu500NyO9z1hwYRPt8CiJ9pFqE0lfc/Gu\n-----END PRIVATE KEY-----",
    "caCertPem": "-----BEGIN CERTIFICATE-----\nMIIBeDCCAR6gAwIBAgIBATAKBggqhkjOPQQDAjAzMTEwLwYDVQQDDCgwQmtXLVMw\nMHMyYy1WdGdjZkUtalpQX1QyS0NLNGJldTBqdVZweGU3MB4XDTI1MDUwNjA4MzEw\nOFoXDTM1MDUwNjA4MzEwOFowMzExMC8GA1UEAwwoMEJrVy1TMDBzMmMtVnRnY2ZF\nLWpaUF9UMktDSzRiZXUwanVWcHhlNzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IA\nBFNG89j0CsnrXF/rRQRi+WAuGOIelNmyTyRbDT3UJXSOAzqOzJcTeHa2ZMHJJmn8\nWggJYBJOSHiUGCkbdFm1FYKjIzAhMA8GA1UdEwEB/wQFMAMBAf8wDgYDVR0PAQH/\nBAQDAgKEMAoGCCqGSM49BAMCA0gAMEUCIEUWZGdKTy4N9EitR9AXoHs/a5jMEhJa\nGprWg1APvDa5AiEA6EShK6gsJheI8RLxVlyWBAZYzm17E5DeTneN/pIEu9o=\n-----END CERTIFICATE-----",
    "jwtPublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo0Dfk7MD894PJ5kxGISY\nfy8Q2MZik8shs+A/4+KhaUrKVjHbKp98Nkix/PqZdQ5BgzI6ZFmpsh1Ma73MreJV\nTIlXzhKzWgio6HcJpdNiheem8xfIdW/4DC+wZCxLgat3JjqXFtTeBibWNPQRrznn\niCPVfzIwhVYEvaajxnUJOtRlsvow2suSimvihxJyNTQlN0FdEzdN/kw4dtarVSDV\npicMEw3+iJv3JH4UAz+Fz4vmLzT9TniMOmC0J1cco9Z6SNAqYMKBQmD3Wx7VM8SV\nYTLfF6JaY8e7/qjkUpeBjvCGPMQW1oIVLb2O5Xfc/YYLuD/2MTfMz0sV6H1M66wt\nTwIDAQAB\n-----END PUBLIC KEY-----\n",
};
console.log('caCertPem', fl.caCertPem == de.caCertPem);
console.log('nodeCertPem', fl.nodeCertPem == de.nodeCertPem);
console.log('nodeKeyPem', fl.nodeKeyPem == de.nodeKeyPem);
console.log('jwtPublicKey', fl.jwtPublicKey == de.jwtPublicKey);


/***/ }),

/***/ "./src/modules/squid-node.module.ts":
/*!******************************************!*\
  !*** ./src/modules/squid-node.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SquidNodeModule_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SquidNodeModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/modules/users/users.module.ts");
const redis_service_1 = __webpack_require__(/*! @/common/libs/redis/redis.service */ "./src/common/libs/redis/redis.service.ts");
let SquidNodeModule = SquidNodeModule_1 = class SquidNodeModule {
    redisService;
    logger = new common_1.Logger(SquidNodeModule_1.name);
    constructor(redisService) {
        this.redisService = redisService;
    }
    async onApplicationShutdown(signal) {
        this.logger.log(`${signal} received, shutting down...`);
        await this.redisService.client.quit();
    }
};
exports.SquidNodeModule = SquidNodeModule;
exports.SquidNodeModule = SquidNodeModule = SquidNodeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
        ],
        providers: [],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof redis_service_1.RedisService !== "undefined" && redis_service_1.RedisService) === "function" ? _a : Object])
], SquidNodeModule);


/***/ }),

/***/ "./src/modules/users/dto/add-user.dto.ts":
/*!***********************************************!*\
  !*** ./src/modules/users/dto/add-user.dto.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddUserResponseDto = exports.AddUserRequestDto = void 0;
const nestjs_zod_1 = __webpack_require__(/*! nestjs-zod */ "nestjs-zod");
const contracts_1 = __webpack_require__(/*! @/contracts */ "./src/contracts/index.ts");
class AddUserRequestDto extends (0, nestjs_zod_1.createZodDto)(contracts_1.AddUserContract.RequestSchema) {
}
exports.AddUserRequestDto = AddUserRequestDto;
class AddUserResponseDto extends (0, nestjs_zod_1.createZodDto)(contracts_1.AddUserContract.ResponseSchema) {
}
exports.AddUserResponseDto = AddUserResponseDto;


/***/ }),

/***/ "./src/modules/users/dto/index.ts":
/*!****************************************!*\
  !*** ./src/modules/users/dto/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./post-users.dto */ "./src/modules/users/dto/post-users.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./add-user.dto */ "./src/modules/users/dto/add-user.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./remove-user.dto */ "./src/modules/users/dto/remove-user.dto.ts"), exports);


/***/ }),

/***/ "./src/modules/users/dto/post-users.dto.ts":
/*!*************************************************!*\
  !*** ./src/modules/users/dto/post-users.dto.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostUsersResponseDto = exports.PostUsersRequestDto = void 0;
const nestjs_zod_1 = __webpack_require__(/*! nestjs-zod */ "nestjs-zod");
const contracts_1 = __webpack_require__(/*! @/contracts */ "./src/contracts/index.ts");
class PostUsersRequestDto extends (0, nestjs_zod_1.createZodDto)(contracts_1.PostUsersContract.RequestSchema) {
}
exports.PostUsersRequestDto = PostUsersRequestDto;
class PostUsersResponseDto extends (0, nestjs_zod_1.createZodDto)(contracts_1.PostUsersContract.ResponseSchema) {
}
exports.PostUsersResponseDto = PostUsersResponseDto;


/***/ }),

/***/ "./src/modules/users/dto/remove-user.dto.ts":
/*!**************************************************!*\
  !*** ./src/modules/users/dto/remove-user.dto.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveUserResponseDto = exports.RemoveUserRequestDto = void 0;
const nestjs_zod_1 = __webpack_require__(/*! nestjs-zod */ "nestjs-zod");
const contracts_1 = __webpack_require__(/*! @/contracts */ "./src/contracts/index.ts");
class RemoveUserRequestDto extends (0, nestjs_zod_1.createZodDto)(contracts_1.RemoveUserContract.RequestSchema) {
}
exports.RemoveUserRequestDto = RemoveUserRequestDto;
class RemoveUserResponseDto extends (0, nestjs_zod_1.createZodDto)(contracts_1.RemoveUserContract.ResponseSchema) {
}
exports.RemoveUserResponseDto = RemoveUserResponseDto;


/***/ }),

/***/ "./src/modules/users/entities/user.entity.ts":
/*!***************************************************!*\
  !*** ./src/modules/users/entities/user.entity.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
class UserEntity {
    id;
    username;
    password;
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
exports.UserEntity = UserEntity;


/***/ }),

/***/ "./src/modules/users/models/add-user-response.model.ts":
/*!*************************************************************!*\
  !*** ./src/modules/users/models/add-user-response.model.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddUserResponseModel = void 0;
class AddUserResponseModel {
    success;
    error;
    constructor(success, error) {
        this.success = success;
        this.error = error || null;
    }
}
exports.AddUserResponseModel = AddUserResponseModel;


/***/ }),

/***/ "./src/modules/users/models/index.ts":
/*!*******************************************!*\
  !*** ./src/modules/users/models/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./post-users-response.model */ "./src/modules/users/models/post-users-response.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./add-user-response.model */ "./src/modules/users/models/add-user-response.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./remove-user-response.model */ "./src/modules/users/models/remove-user-response.model.ts"), exports);


/***/ }),

/***/ "./src/modules/users/models/post-users-response.model.ts":
/*!***************************************************************!*\
  !*** ./src/modules/users/models/post-users-response.model.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostUsersResponseModel = void 0;
class PostUsersResponseModel {
    success;
    error;
    constructor(success, error) {
        this.success = success;
        this.error = error || null;
    }
}
exports.PostUsersResponseModel = PostUsersResponseModel;


/***/ }),

/***/ "./src/modules/users/models/remove-user-response.model.ts":
/*!****************************************************************!*\
  !*** ./src/modules/users/models/remove-user-response.model.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveUserResponseModel = void 0;
class RemoveUserResponseModel {
    success;
    error;
    constructor(success, error) {
        this.success = success;
        this.error = error || null;
    }
}
exports.RemoveUserResponseModel = RemoveUserResponseModel;


/***/ }),

/***/ "./src/modules/users/repositories/users.repository.ts":
/*!************************************************************!*\
  !*** ./src/modules/users/repositories/users.repository.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const redis_service_1 = __webpack_require__(/*! @/common/libs/redis/redis.service */ "./src/common/libs/redis/redis.service.ts");
let UsersRepository = class UsersRepository {
    redisService;
    constructor(redisService) {
        this.redisService = redisService;
    }
    async create(user) {
        await this.redisService.client.hSet(`user:${user.username}`, 'password', user.password);
        await this.redisService.client.hSet(`user:${user.username}`, 'id', user.id);
        return user;
    }
    async clear() {
        let cursor = '0';
        let keysToDelete = [];
        do {
            const { cursor: nextCursor, keys, } = await this.redisService.client.scan(cursor, {
                MATCH: 'user:*',
                COUNT: 100,
            });
            keysToDelete = keysToDelete.concat(keys);
            cursor = nextCursor;
        } while (cursor !== '0');
        if (keysToDelete.length > 0) {
            await this.redisService.client.del(keysToDelete);
        }
    }
    async remove(username) {
        await this.redisService.client.del(`user:${username}`);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof redis_service_1.RedisService !== "undefined" && redis_service_1.RedisService) === "function" ? _a : Object])
], UsersRepository);


/***/ }),

/***/ "./src/modules/users/users.controller.ts":
/*!***********************************************!*\
  !*** ./src/modules/users/users.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const contracts_1 = __webpack_require__(/*! @/contracts */ "./src/contracts/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! @/modules/users/users.service */ "./src/modules/users/users.service.ts");
const dto_1 = __webpack_require__(/*! @/modules/users/dto */ "./src/modules/users/dto/index.ts");
const error_handler_helper_1 = __webpack_require__(/*! @/common/helpers/error-handler.helper */ "./src/common/helpers/error-handler.helper.ts");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async postUsers(body) {
        const response = await this.usersService.postUsers(body);
        const data = (0, error_handler_helper_1.errorHandler)(response);
        return {
            response: data,
        };
    }
    async addUser(body) {
        const response = await this.usersService.addUser(body);
        const data = (0, error_handler_helper_1.errorHandler)(response);
        return {
            response: data,
        };
    }
    async removeUser(body) {
        const response = await this.usersService.removeUser(body);
        const data = (0, error_handler_helper_1.errorHandler)(response);
        return {
            response: data,
        };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(contracts_1.USERS_ROUTES.POST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof dto_1.PostUsersRequestDto !== "undefined" && dto_1.PostUsersRequestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "postUsers", null);
__decorate([
    (0, common_1.Post)(contracts_1.USERS_ROUTES.ADD),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.AddUserRequestDto !== "undefined" && dto_1.AddUserRequestDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)(contracts_1.USERS_ROUTES.REMOVE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof dto_1.RemoveUserRequestDto !== "undefined" && dto_1.RemoveUserRequestDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "removeUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(contracts_1.USERS_CONTROLLER),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),

/***/ "./src/modules/users/users.module.ts":
/*!*******************************************!*\
  !*** ./src/modules/users/users.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./src/modules/users/users.controller.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./src/modules/users/users.service.ts");
const users_repository_1 = __webpack_require__(/*! @/modules/users/repositories/users.repository */ "./src/modules/users/repositories/users.repository.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [users_controller_1.UsersController],
        providers: [users_repository_1.UsersRepository, users_service_1.UsersService],
    })
], UsersModule);


/***/ }),

/***/ "./src/modules/users/users.service.ts":
/*!********************************************!*\
  !*** ./src/modules/users/users.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const constants_1 = __webpack_require__(/*! @contract/constants */ "./src/contracts/constants/index.ts");
const models_1 = __webpack_require__(/*! @/modules/users/models */ "./src/modules/users/models/index.ts");
const users_repository_1 = __webpack_require__(/*! @/modules/users/repositories/users.repository */ "./src/modules/users/repositories/users.repository.ts");
const user_entity_1 = __webpack_require__(/*! @/modules/users/entities/user.entity */ "./src/modules/users/entities/user.entity.ts");
let UsersService = UsersService_1 = class UsersService {
    usersRepository;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async postUsers(data) {
        try {
            await this.usersRepository.clear();
            for (const user of data.data) {
                await this.usersRepository.create(new user_entity_1.UserEntity(user.id, user.username, user.password));
            }
            return {
                success: true,
                response: new models_1.PostUsersResponseModel(true),
            };
        }
        catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: constants_1.ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new models_1.PostUsersResponseModel(false, message),
            };
        }
    }
    async addUser(data) {
        try {
            await this.usersRepository.create(new user_entity_1.UserEntity(data.id, data.username, data.password));
            return {
                success: true,
                response: new models_1.AddUserResponseModel(true),
            };
        }
        catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: constants_1.ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new models_1.AddUserResponseModel(false, message),
            };
        }
    }
    async removeUser(data) {
        try {
            await this.usersRepository.remove(data.username);
            return {
                success: true,
                response: new models_1.AddUserResponseModel(true),
            };
        }
        catch (error) {
            this.logger.error(error);
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                success: false,
                code: constants_1.ERRORS.INTERNAL_SERVER_ERROR.code,
                response: new models_1.AddUserResponseModel(false, message),
            };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_repository_1.UsersRepository !== "undefined" && users_repository_1.UsersRepository) === "function" ? _a : Object])
], UsersService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/common/exceptions/http.exception":
/*!***********************************************************!*\
  !*** external "@nestjs/common/exceptions/http.exception" ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = require("@nestjs/common/exceptions/http.exception");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "nest-winston":
/*!*******************************!*\
  !*** external "nest-winston" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),

/***/ "nestjs-zod":
/*!*****************************!*\
  !*** external "nestjs-zod" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nestjs-zod");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "zod":
/*!**********************!*\
  !*** external "zod" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("zod");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;