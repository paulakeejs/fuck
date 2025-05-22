
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vendor
 * 
 */
export type Vendor = $Result.DefaultSelection<Prisma.$VendorPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Jet
 * 
 */
export type Jet = $Result.DefaultSelection<Prisma.$JetPayload>
/**
 * Model JetForBids
 * 
 */
export type JetForBids = $Result.DefaultSelection<Prisma.$JetForBidsPayload>
/**
 * Model JetForCharter
 * 
 */
export type JetForCharter = $Result.DefaultSelection<Prisma.$JetForCharterPayload>
/**
 * Model JetForSaleMessages
 * 
 */
export type JetForSaleMessages = $Result.DefaultSelection<Prisma.$JetForSaleMessagesPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TripOption: {
  ROUND_TRIP: 'ROUND_TRIP',
  ONE_WAY: 'ONE_WAY',
  BOTH: 'BOTH'
};

export type TripOption = (typeof TripOption)[keyof typeof TripOption]

}

export type TripOption = $Enums.TripOption

export const TripOption: typeof $Enums.TripOption

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendor`: Exposes CRUD operations for the **Vendor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendor.findMany()
    * ```
    */
  get vendor(): Prisma.VendorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jet`: Exposes CRUD operations for the **Jet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jets
    * const jets = await prisma.jet.findMany()
    * ```
    */
  get jet(): Prisma.JetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jetForBids`: Exposes CRUD operations for the **JetForBids** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JetForBids
    * const jetForBids = await prisma.jetForBids.findMany()
    * ```
    */
  get jetForBids(): Prisma.JetForBidsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jetForCharter`: Exposes CRUD operations for the **JetForCharter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JetForCharters
    * const jetForCharters = await prisma.jetForCharter.findMany()
    * ```
    */
  get jetForCharter(): Prisma.JetForCharterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jetForSaleMessages`: Exposes CRUD operations for the **JetForSaleMessages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JetForSaleMessages
    * const jetForSaleMessages = await prisma.jetForSaleMessages.findMany()
    * ```
    */
  get jetForSaleMessages(): Prisma.JetForSaleMessagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Vendor: 'Vendor',
    Admin: 'Admin',
    Jet: 'Jet',
    JetForBids: 'JetForBids',
    JetForCharter: 'JetForCharter',
    JetForSaleMessages: 'JetForSaleMessages',
    Wallet: 'Wallet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "vendor" | "admin" | "jet" | "jetForBids" | "jetForCharter" | "jetForSaleMessages" | "wallet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vendor: {
        payload: Prisma.$VendorPayload<ExtArgs>
        fields: Prisma.VendorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findFirst: {
            args: Prisma.VendorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findMany: {
            args: Prisma.VendorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          create: {
            args: Prisma.VendorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          createMany: {
            args: Prisma.VendorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          delete: {
            args: Prisma.VendorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          update: {
            args: Prisma.VendorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          deleteMany: {
            args: Prisma.VendorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          upsert: {
            args: Prisma.VendorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          aggregate: {
            args: Prisma.VendorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendor>
          }
          groupBy: {
            args: Prisma.VendorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorCountArgs<ExtArgs>
            result: $Utils.Optional<VendorCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Jet: {
        payload: Prisma.$JetPayload<ExtArgs>
        fields: Prisma.JetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>
          }
          findFirst: {
            args: Prisma.JetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>
          }
          findMany: {
            args: Prisma.JetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>[]
          }
          create: {
            args: Prisma.JetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>
          }
          createMany: {
            args: Prisma.JetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>[]
          }
          delete: {
            args: Prisma.JetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>
          }
          update: {
            args: Prisma.JetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>
          }
          deleteMany: {
            args: Prisma.JetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>[]
          }
          upsert: {
            args: Prisma.JetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetPayload>
          }
          aggregate: {
            args: Prisma.JetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJet>
          }
          groupBy: {
            args: Prisma.JetGroupByArgs<ExtArgs>
            result: $Utils.Optional<JetGroupByOutputType>[]
          }
          count: {
            args: Prisma.JetCountArgs<ExtArgs>
            result: $Utils.Optional<JetCountAggregateOutputType> | number
          }
        }
      }
      JetForBids: {
        payload: Prisma.$JetForBidsPayload<ExtArgs>
        fields: Prisma.JetForBidsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JetForBidsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JetForBidsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>
          }
          findFirst: {
            args: Prisma.JetForBidsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JetForBidsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>
          }
          findMany: {
            args: Prisma.JetForBidsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>[]
          }
          create: {
            args: Prisma.JetForBidsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>
          }
          createMany: {
            args: Prisma.JetForBidsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JetForBidsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>[]
          }
          delete: {
            args: Prisma.JetForBidsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>
          }
          update: {
            args: Prisma.JetForBidsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>
          }
          deleteMany: {
            args: Prisma.JetForBidsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JetForBidsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JetForBidsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>[]
          }
          upsert: {
            args: Prisma.JetForBidsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForBidsPayload>
          }
          aggregate: {
            args: Prisma.JetForBidsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJetForBids>
          }
          groupBy: {
            args: Prisma.JetForBidsGroupByArgs<ExtArgs>
            result: $Utils.Optional<JetForBidsGroupByOutputType>[]
          }
          count: {
            args: Prisma.JetForBidsCountArgs<ExtArgs>
            result: $Utils.Optional<JetForBidsCountAggregateOutputType> | number
          }
        }
      }
      JetForCharter: {
        payload: Prisma.$JetForCharterPayload<ExtArgs>
        fields: Prisma.JetForCharterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JetForCharterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JetForCharterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>
          }
          findFirst: {
            args: Prisma.JetForCharterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JetForCharterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>
          }
          findMany: {
            args: Prisma.JetForCharterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>[]
          }
          create: {
            args: Prisma.JetForCharterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>
          }
          createMany: {
            args: Prisma.JetForCharterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JetForCharterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>[]
          }
          delete: {
            args: Prisma.JetForCharterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>
          }
          update: {
            args: Prisma.JetForCharterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>
          }
          deleteMany: {
            args: Prisma.JetForCharterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JetForCharterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JetForCharterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>[]
          }
          upsert: {
            args: Prisma.JetForCharterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterPayload>
          }
          aggregate: {
            args: Prisma.JetForCharterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJetForCharter>
          }
          groupBy: {
            args: Prisma.JetForCharterGroupByArgs<ExtArgs>
            result: $Utils.Optional<JetForCharterGroupByOutputType>[]
          }
          count: {
            args: Prisma.JetForCharterCountArgs<ExtArgs>
            result: $Utils.Optional<JetForCharterCountAggregateOutputType> | number
          }
        }
      }
      JetForSaleMessages: {
        payload: Prisma.$JetForSaleMessagesPayload<ExtArgs>
        fields: Prisma.JetForSaleMessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JetForSaleMessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JetForSaleMessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>
          }
          findFirst: {
            args: Prisma.JetForSaleMessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JetForSaleMessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>
          }
          findMany: {
            args: Prisma.JetForSaleMessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>[]
          }
          create: {
            args: Prisma.JetForSaleMessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>
          }
          createMany: {
            args: Prisma.JetForSaleMessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JetForSaleMessagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>[]
          }
          delete: {
            args: Prisma.JetForSaleMessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>
          }
          update: {
            args: Prisma.JetForSaleMessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>
          }
          deleteMany: {
            args: Prisma.JetForSaleMessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JetForSaleMessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JetForSaleMessagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>[]
          }
          upsert: {
            args: Prisma.JetForSaleMessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForSaleMessagesPayload>
          }
          aggregate: {
            args: Prisma.JetForSaleMessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJetForSaleMessages>
          }
          groupBy: {
            args: Prisma.JetForSaleMessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<JetForSaleMessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.JetForSaleMessagesCountArgs<ExtArgs>
            result: $Utils.Optional<JetForSaleMessagesCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    vendor?: VendorOmit
    admin?: AdminOmit
    jet?: JetOmit
    jetForBids?: JetForBidsOmit
    jetForCharter?: JetForCharterOmit
    jetForSaleMessages?: JetForSaleMessagesOmit
    wallet?: WalletOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    publicKey: string | null
    admin: boolean | null
    status: string | null
    vendor: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    publicKey: string | null
    admin: boolean | null
    status: string | null
    vendor: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    publicKey: number
    admin: number
    status: number
    vendor: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    publicKey?: true
    admin?: true
    status?: true
    vendor?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    publicKey?: true
    admin?: true
    status?: true
    vendor?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    publicKey?: true
    admin?: true
    status?: true
    vendor?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    publicKey: string
    admin: boolean
    status: string
    vendor: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    admin?: boolean
    status?: boolean
    vendor?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    admin?: boolean
    status?: boolean
    vendor?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicKey?: boolean
    admin?: boolean
    status?: boolean
    vendor?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    publicKey?: boolean
    admin?: boolean
    status?: boolean
    vendor?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "publicKey" | "admin" | "status" | "vendor", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      publicKey: string
      admin: boolean
      status: string
      vendor: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly publicKey: FieldRef<"User", 'String'>
    readonly admin: FieldRef<"User", 'Boolean'>
    readonly status: FieldRef<"User", 'String'>
    readonly vendor: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Vendor
   */

  export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  export type VendorMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    name: string | null
    companyName: string | null
    country: string | null
    phone: string | null
    serviceType: string | null
    status: string | null
    website: string | null
    description: string | null
    document: string | null
    password: string | null
    brandImage: string | null
    walletAddress: string | null
  }

  export type VendorMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    name: string | null
    companyName: string | null
    country: string | null
    phone: string | null
    serviceType: string | null
    status: string | null
    website: string | null
    description: string | null
    document: string | null
    password: string | null
    brandImage: string | null
    walletAddress: string | null
  }

  export type VendorCountAggregateOutputType = {
    id: number
    createdAt: number
    email: number
    name: number
    companyName: number
    country: number
    phone: number
    serviceType: number
    status: number
    website: number
    description: number
    document: number
    password: number
    brandImage: number
    walletAddress: number
    _all: number
  }


  export type VendorMinAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    name?: true
    companyName?: true
    country?: true
    phone?: true
    serviceType?: true
    status?: true
    website?: true
    description?: true
    document?: true
    password?: true
    brandImage?: true
    walletAddress?: true
  }

  export type VendorMaxAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    name?: true
    companyName?: true
    country?: true
    phone?: true
    serviceType?: true
    status?: true
    website?: true
    description?: true
    document?: true
    password?: true
    brandImage?: true
    walletAddress?: true
  }

  export type VendorCountAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    name?: true
    companyName?: true
    country?: true
    phone?: true
    serviceType?: true
    status?: true
    website?: true
    description?: true
    document?: true
    password?: true
    brandImage?: true
    walletAddress?: true
    _all?: true
  }

  export type VendorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendor to aggregate.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendors
    **/
    _count?: true | VendorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorMaxAggregateInputType
  }

  export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
        [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendor[P]>
      : GetScalarType<T[P], AggregateVendor[P]>
  }




  export type VendorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorWhereInput
    orderBy?: VendorOrderByWithAggregationInput | VendorOrderByWithAggregationInput[]
    by: VendorScalarFieldEnum[] | VendorScalarFieldEnum
    having?: VendorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorCountAggregateInputType | true
    _min?: VendorMinAggregateInputType
    _max?: VendorMaxAggregateInputType
  }

  export type VendorGroupByOutputType = {
    id: string
    createdAt: Date
    email: string
    name: string
    companyName: string
    country: string | null
    phone: string
    serviceType: string
    status: string
    website: string | null
    description: string | null
    document: string | null
    password: string | null
    brandImage: string
    walletAddress: string | null
    _count: VendorCountAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorGroupByOutputType[P]>
            : GetScalarType<T[P], VendorGroupByOutputType[P]>
        }
      >
    >


  export type VendorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    companyName?: boolean
    country?: boolean
    phone?: boolean
    serviceType?: boolean
    status?: boolean
    website?: boolean
    description?: boolean
    document?: boolean
    password?: boolean
    brandImage?: boolean
    walletAddress?: boolean
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    companyName?: boolean
    country?: boolean
    phone?: boolean
    serviceType?: boolean
    status?: boolean
    website?: boolean
    description?: boolean
    document?: boolean
    password?: boolean
    brandImage?: boolean
    walletAddress?: boolean
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    companyName?: boolean
    country?: boolean
    phone?: boolean
    serviceType?: boolean
    status?: boolean
    website?: boolean
    description?: boolean
    document?: boolean
    password?: boolean
    brandImage?: boolean
    walletAddress?: boolean
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectScalar = {
    id?: boolean
    createdAt?: boolean
    email?: boolean
    name?: boolean
    companyName?: boolean
    country?: boolean
    phone?: boolean
    serviceType?: boolean
    status?: boolean
    website?: boolean
    description?: boolean
    document?: boolean
    password?: boolean
    brandImage?: boolean
    walletAddress?: boolean
  }

  export type VendorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "email" | "name" | "companyName" | "country" | "phone" | "serviceType" | "status" | "website" | "description" | "document" | "password" | "brandImage" | "walletAddress", ExtArgs["result"]["vendor"]>

  export type $VendorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vendor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      email: string
      name: string
      companyName: string
      country: string | null
      phone: string
      serviceType: string
      status: string
      website: string | null
      description: string | null
      document: string | null
      password: string | null
      brandImage: string
      walletAddress: string | null
    }, ExtArgs["result"]["vendor"]>
    composites: {}
  }

  type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = $Result.GetResult<Prisma.$VendorPayload, S>

  type VendorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendorCountAggregateInputType | true
    }

  export interface VendorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vendor'], meta: { name: 'Vendor' } }
    /**
     * Find zero or one Vendor that matches the filter.
     * @param {VendorFindUniqueArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorFindUniqueArgs>(args: SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vendor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendorFindUniqueOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorFindFirstArgs>(args?: SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendor.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorWithIdOnly = await prisma.vendor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorFindManyArgs>(args?: SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vendor.
     * @param {VendorCreateArgs} args - Arguments to create a Vendor.
     * @example
     * // Create one Vendor
     * const Vendor = await prisma.vendor.create({
     *   data: {
     *     // ... data to create a Vendor
     *   }
     * })
     * 
     */
    create<T extends VendorCreateArgs>(args: SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendors.
     * @param {VendorCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorCreateManyArgs>(args?: SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vendor.
     * @param {VendorDeleteArgs} args - Arguments to delete one Vendor.
     * @example
     * // Delete one Vendor
     * const Vendor = await prisma.vendor.delete({
     *   where: {
     *     // ... filter to delete one Vendor
     *   }
     * })
     * 
     */
    delete<T extends VendorDeleteArgs>(args: SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vendor.
     * @param {VendorUpdateArgs} args - Arguments to update one Vendor.
     * @example
     * // Update one Vendor
     * const vendor = await prisma.vendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorUpdateArgs>(args: SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendors.
     * @param {VendorDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorDeleteManyArgs>(args?: SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorUpdateManyArgs>(args: SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors and returns the data updated in the database.
     * @param {VendorUpdateManyAndReturnArgs} args - Arguments to update many Vendors.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendorUpdateManyAndReturnArgs>(args: SelectSubset<T, VendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vendor.
     * @param {VendorUpsertArgs} args - Arguments to update or create a Vendor.
     * @example
     * // Update or create a Vendor
     * const vendor = await prisma.vendor.upsert({
     *   create: {
     *     // ... data to create a Vendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendor we want to update
     *   }
     * })
     */
    upsert<T extends VendorUpsertArgs>(args: SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendor.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorCountArgs>(
      args?: Subset<T, VendorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorAggregateArgs>(args: Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>

    /**
     * Group by Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorGroupByArgs['orderBy'] }
        : { orderBy?: VendorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vendor model
   */
  readonly fields: VendorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vendor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vendor model
   */
  interface VendorFieldRefs {
    readonly id: FieldRef<"Vendor", 'String'>
    readonly createdAt: FieldRef<"Vendor", 'DateTime'>
    readonly email: FieldRef<"Vendor", 'String'>
    readonly name: FieldRef<"Vendor", 'String'>
    readonly companyName: FieldRef<"Vendor", 'String'>
    readonly country: FieldRef<"Vendor", 'String'>
    readonly phone: FieldRef<"Vendor", 'String'>
    readonly serviceType: FieldRef<"Vendor", 'String'>
    readonly status: FieldRef<"Vendor", 'String'>
    readonly website: FieldRef<"Vendor", 'String'>
    readonly description: FieldRef<"Vendor", 'String'>
    readonly document: FieldRef<"Vendor", 'String'>
    readonly password: FieldRef<"Vendor", 'String'>
    readonly brandImage: FieldRef<"Vendor", 'String'>
    readonly walletAddress: FieldRef<"Vendor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vendor findUnique
   */
  export type VendorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findUniqueOrThrow
   */
  export type VendorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findFirst
   */
  export type VendorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findFirstOrThrow
   */
  export type VendorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findMany
   */
  export type VendorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor create
   */
  export type VendorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data needed to create a Vendor.
     */
    data: XOR<VendorCreateInput, VendorUncheckedCreateInput>
  }

  /**
   * Vendor createMany
   */
  export type VendorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendor createManyAndReturn
   */
  export type VendorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendor update
   */
  export type VendorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data needed to update a Vendor.
     */
    data: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
    /**
     * Choose, which Vendor to update.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor updateMany
   */
  export type VendorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendor updateManyAndReturn
   */
  export type VendorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to update.
     */
    limit?: number
  }

  /**
   * Vendor upsert
   */
  export type VendorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * The filter to search for the Vendor to update in case it exists.
     */
    where: VendorWhereUniqueInput
    /**
     * In case the Vendor found by the `where` argument doesn't exist, create a new Vendor with this data.
     */
    create: XOR<VendorCreateInput, VendorUncheckedCreateInput>
    /**
     * In case the Vendor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
  }

  /**
   * Vendor delete
   */
  export type VendorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
    /**
     * Filter which Vendor to delete.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor deleteMany
   */
  export type VendorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: VendorWhereInput
    /**
     * Limit how many Vendors to delete.
     */
    limit?: number
  }

  /**
   * Vendor without action
   */
  export type VendorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vendor
     */
    omit?: VendorOmit<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    password: string | null
    name: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    email: string | null
    password: string | null
    name: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    createdAt: number
    email: number
    password: number
    name: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    password?: true
    name?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    password?: true
    name?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    password?: true
    name?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    createdAt: Date
    email: string
    password: string
    name: string
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "email" | "password" | "name", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      email: string
      password: string
      name: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model Jet
   */

  export type AggregateJet = {
    _count: JetCountAggregateOutputType | null
    _avg: JetAvgAggregateOutputType | null
    _sum: JetSumAggregateOutputType | null
    _min: JetMinAggregateOutputType | null
    _max: JetMaxAggregateOutputType | null
  }

  export type JetAvgAggregateOutputType = {
    year: number | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineHours: number | null
    seatingCapacity: number | null
    cabinHeight: number | null
    cabinWidth: number | null
    cabinLength: number | null
    baggageCapacity: number | null
    numberOfEngines: number | null
    engineThrust: number | null
    previousOwners: number | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    views: number | null
  }

  export type JetSumAggregateOutputType = {
    year: number | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineHours: number | null
    seatingCapacity: number | null
    cabinHeight: number | null
    cabinWidth: number | null
    cabinLength: number | null
    baggageCapacity: number | null
    numberOfEngines: number | null
    engineThrust: number | null
    previousOwners: number | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    views: number | null
  }

  export type JetMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    manufacturer: string | null
    otherManufacturer: string | null
    model: string | null
    year: number | null
    serialNumber: string | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineMakeModel: string | null
    engineHours: number | null
    avionicsSuite: string | null
    interiorConfig: string | null
    price: string | null
    currentLocation: string | null
    registrationNumber: string | null
    contactDetails: string | null
    aircraftType: string | null
    seatingCapacity: number | null
    cabinHeight: number | null
    cabinWidth: number | null
    cabinLength: number | null
    baggageCapacity: number | null
    numberOfEngines: number | null
    engineType: string | null
    engineThrust: number | null
    certification: string | null
    noiseCompliance: string | null
    lastInspectionDate: Date | null
    nextInspectionDue: Date | null
    maintenanceStatus: string | null
    previousOwners: number | null
    maintenanceProgram: string | null
    airframeEngineStatus: string | null
    refurbishmentDate: string | null
    wifiConnectivity: string | null
    lavatoryGalleyDetails: string | null
    cabinAmenities: string | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    deliveryAvailability: string | null
    paymentTxSignature: string | null
    transactionLink: string | null
    vendorId: string | null
    views: number | null
    status: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    end_date: Date | null
  }

  export type JetMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    manufacturer: string | null
    otherManufacturer: string | null
    model: string | null
    year: number | null
    serialNumber: string | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineMakeModel: string | null
    engineHours: number | null
    avionicsSuite: string | null
    interiorConfig: string | null
    price: string | null
    currentLocation: string | null
    registrationNumber: string | null
    contactDetails: string | null
    aircraftType: string | null
    seatingCapacity: number | null
    cabinHeight: number | null
    cabinWidth: number | null
    cabinLength: number | null
    baggageCapacity: number | null
    numberOfEngines: number | null
    engineType: string | null
    engineThrust: number | null
    certification: string | null
    noiseCompliance: string | null
    lastInspectionDate: Date | null
    nextInspectionDue: Date | null
    maintenanceStatus: string | null
    previousOwners: number | null
    maintenanceProgram: string | null
    airframeEngineStatus: string | null
    refurbishmentDate: string | null
    wifiConnectivity: string | null
    lavatoryGalleyDetails: string | null
    cabinAmenities: string | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    deliveryAvailability: string | null
    paymentTxSignature: string | null
    transactionLink: string | null
    vendorId: string | null
    views: number | null
    status: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    end_date: Date | null
  }

  export type JetCountAggregateOutputType = {
    id: number
    createdAt: number
    manufacturer: number
    otherManufacturer: number
    model: number
    year: number
    serialNumber: number
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: number
    engineHours: number
    avionicsSuite: number
    interiorConfig: number
    interiorImageUrls: number
    exteriorImageUrls: number
    price: number
    currentLocation: number
    registrationNumber: number
    contactDetails: number
    aircraftType: number
    seatingCapacity: number
    cabinHeight: number
    cabinWidth: number
    cabinLength: number
    baggageCapacity: number
    numberOfEngines: number
    engineType: number
    engineThrust: number
    certification: number
    noiseCompliance: number
    lastInspectionDate: number
    nextInspectionDue: number
    maintenanceStatus: number
    previousOwners: number
    maintenanceProgram: number
    airframeEngineStatus: number
    refurbishmentDate: number
    wifiConnectivity: number
    lavatoryGalleyDetails: number
    cabinAmenities: number
    range: number
    cruiseSpeed: number
    maxAltitude: number
    runwayLength: number
    emptyWeight: number
    maxTakeoffWeight: number
    deliveryAvailability: number
    paymentTxSignature: number
    transactionLink: number
    vendorId: number
    views: number
    status: number
    sponsored: number
    sponsoredType: number
    end_date: number
    _all: number
  }


  export type JetAvgAggregateInputType = {
    year?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineHours?: true
    seatingCapacity?: true
    cabinHeight?: true
    cabinWidth?: true
    cabinLength?: true
    baggageCapacity?: true
    numberOfEngines?: true
    engineThrust?: true
    previousOwners?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    views?: true
  }

  export type JetSumAggregateInputType = {
    year?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineHours?: true
    seatingCapacity?: true
    cabinHeight?: true
    cabinWidth?: true
    cabinLength?: true
    baggageCapacity?: true
    numberOfEngines?: true
    engineThrust?: true
    previousOwners?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    views?: true
  }

  export type JetMinAggregateInputType = {
    id?: true
    createdAt?: true
    manufacturer?: true
    otherManufacturer?: true
    model?: true
    year?: true
    serialNumber?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineMakeModel?: true
    engineHours?: true
    avionicsSuite?: true
    interiorConfig?: true
    price?: true
    currentLocation?: true
    registrationNumber?: true
    contactDetails?: true
    aircraftType?: true
    seatingCapacity?: true
    cabinHeight?: true
    cabinWidth?: true
    cabinLength?: true
    baggageCapacity?: true
    numberOfEngines?: true
    engineType?: true
    engineThrust?: true
    certification?: true
    noiseCompliance?: true
    lastInspectionDate?: true
    nextInspectionDue?: true
    maintenanceStatus?: true
    previousOwners?: true
    maintenanceProgram?: true
    airframeEngineStatus?: true
    refurbishmentDate?: true
    wifiConnectivity?: true
    lavatoryGalleyDetails?: true
    cabinAmenities?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    deliveryAvailability?: true
    paymentTxSignature?: true
    transactionLink?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    end_date?: true
  }

  export type JetMaxAggregateInputType = {
    id?: true
    createdAt?: true
    manufacturer?: true
    otherManufacturer?: true
    model?: true
    year?: true
    serialNumber?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineMakeModel?: true
    engineHours?: true
    avionicsSuite?: true
    interiorConfig?: true
    price?: true
    currentLocation?: true
    registrationNumber?: true
    contactDetails?: true
    aircraftType?: true
    seatingCapacity?: true
    cabinHeight?: true
    cabinWidth?: true
    cabinLength?: true
    baggageCapacity?: true
    numberOfEngines?: true
    engineType?: true
    engineThrust?: true
    certification?: true
    noiseCompliance?: true
    lastInspectionDate?: true
    nextInspectionDue?: true
    maintenanceStatus?: true
    previousOwners?: true
    maintenanceProgram?: true
    airframeEngineStatus?: true
    refurbishmentDate?: true
    wifiConnectivity?: true
    lavatoryGalleyDetails?: true
    cabinAmenities?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    deliveryAvailability?: true
    paymentTxSignature?: true
    transactionLink?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    end_date?: true
  }

  export type JetCountAggregateInputType = {
    id?: true
    createdAt?: true
    manufacturer?: true
    otherManufacturer?: true
    model?: true
    year?: true
    serialNumber?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineMakeModel?: true
    engineHours?: true
    avionicsSuite?: true
    interiorConfig?: true
    interiorImageUrls?: true
    exteriorImageUrls?: true
    price?: true
    currentLocation?: true
    registrationNumber?: true
    contactDetails?: true
    aircraftType?: true
    seatingCapacity?: true
    cabinHeight?: true
    cabinWidth?: true
    cabinLength?: true
    baggageCapacity?: true
    numberOfEngines?: true
    engineType?: true
    engineThrust?: true
    certification?: true
    noiseCompliance?: true
    lastInspectionDate?: true
    nextInspectionDue?: true
    maintenanceStatus?: true
    previousOwners?: true
    maintenanceProgram?: true
    airframeEngineStatus?: true
    refurbishmentDate?: true
    wifiConnectivity?: true
    lavatoryGalleyDetails?: true
    cabinAmenities?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    deliveryAvailability?: true
    paymentTxSignature?: true
    transactionLink?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    end_date?: true
    _all?: true
  }

  export type JetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jet to aggregate.
     */
    where?: JetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jets to fetch.
     */
    orderBy?: JetOrderByWithRelationInput | JetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jets
    **/
    _count?: true | JetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JetMaxAggregateInputType
  }

  export type GetJetAggregateType<T extends JetAggregateArgs> = {
        [P in keyof T & keyof AggregateJet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJet[P]>
      : GetScalarType<T[P], AggregateJet[P]>
  }




  export type JetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JetWhereInput
    orderBy?: JetOrderByWithAggregationInput | JetOrderByWithAggregationInput[]
    by: JetScalarFieldEnum[] | JetScalarFieldEnum
    having?: JetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JetCountAggregateInputType | true
    _avg?: JetAvgAggregateInputType
    _sum?: JetSumAggregateInputType
    _min?: JetMinAggregateInputType
    _max?: JetMaxAggregateInputType
  }

  export type JetGroupByOutputType = {
    id: string
    createdAt: Date
    manufacturer: string
    otherManufacturer: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls: string[]
    exteriorImageUrls: string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    aircraftType: string
    seatingCapacity: number
    cabinHeight: number
    cabinWidth: number
    cabinLength: number
    baggageCapacity: number
    numberOfEngines: number
    engineType: string
    engineThrust: number
    certification: string
    noiseCompliance: string
    lastInspectionDate: Date
    nextInspectionDue: Date
    maintenanceStatus: string
    previousOwners: number | null
    maintenanceProgram: string | null
    airframeEngineStatus: string | null
    refurbishmentDate: string | null
    wifiConnectivity: string | null
    lavatoryGalleyDetails: string | null
    cabinAmenities: string | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    deliveryAvailability: string | null
    paymentTxSignature: string
    transactionLink: string | null
    vendorId: string
    views: number
    status: string
    sponsored: boolean
    sponsoredType: string
    end_date: Date
    _count: JetCountAggregateOutputType | null
    _avg: JetAvgAggregateOutputType | null
    _sum: JetSumAggregateOutputType | null
    _min: JetMinAggregateOutputType | null
    _max: JetMaxAggregateOutputType | null
  }

  type GetJetGroupByPayload<T extends JetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JetGroupByOutputType[P]>
            : GetScalarType<T[P], JetGroupByOutputType[P]>
        }
      >
    >


  export type JetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    aircraftType?: boolean
    seatingCapacity?: boolean
    cabinHeight?: boolean
    cabinWidth?: boolean
    cabinLength?: boolean
    baggageCapacity?: boolean
    numberOfEngines?: boolean
    engineType?: boolean
    engineThrust?: boolean
    certification?: boolean
    noiseCompliance?: boolean
    lastInspectionDate?: boolean
    nextInspectionDue?: boolean
    maintenanceStatus?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    paymentTxSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
  }, ExtArgs["result"]["jet"]>

  export type JetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    aircraftType?: boolean
    seatingCapacity?: boolean
    cabinHeight?: boolean
    cabinWidth?: boolean
    cabinLength?: boolean
    baggageCapacity?: boolean
    numberOfEngines?: boolean
    engineType?: boolean
    engineThrust?: boolean
    certification?: boolean
    noiseCompliance?: boolean
    lastInspectionDate?: boolean
    nextInspectionDue?: boolean
    maintenanceStatus?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    paymentTxSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
  }, ExtArgs["result"]["jet"]>

  export type JetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    aircraftType?: boolean
    seatingCapacity?: boolean
    cabinHeight?: boolean
    cabinWidth?: boolean
    cabinLength?: boolean
    baggageCapacity?: boolean
    numberOfEngines?: boolean
    engineType?: boolean
    engineThrust?: boolean
    certification?: boolean
    noiseCompliance?: boolean
    lastInspectionDate?: boolean
    nextInspectionDue?: boolean
    maintenanceStatus?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    paymentTxSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
  }, ExtArgs["result"]["jet"]>

  export type JetSelectScalar = {
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    aircraftType?: boolean
    seatingCapacity?: boolean
    cabinHeight?: boolean
    cabinWidth?: boolean
    cabinLength?: boolean
    baggageCapacity?: boolean
    numberOfEngines?: boolean
    engineType?: boolean
    engineThrust?: boolean
    certification?: boolean
    noiseCompliance?: boolean
    lastInspectionDate?: boolean
    nextInspectionDue?: boolean
    maintenanceStatus?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    paymentTxSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
  }

  export type JetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "manufacturer" | "otherManufacturer" | "model" | "year" | "serialNumber" | "totalTimeSinceNew" | "totalLandings" | "engineMakeModel" | "engineHours" | "avionicsSuite" | "interiorConfig" | "interiorImageUrls" | "exteriorImageUrls" | "price" | "currentLocation" | "registrationNumber" | "contactDetails" | "aircraftType" | "seatingCapacity" | "cabinHeight" | "cabinWidth" | "cabinLength" | "baggageCapacity" | "numberOfEngines" | "engineType" | "engineThrust" | "certification" | "noiseCompliance" | "lastInspectionDate" | "nextInspectionDue" | "maintenanceStatus" | "previousOwners" | "maintenanceProgram" | "airframeEngineStatus" | "refurbishmentDate" | "wifiConnectivity" | "lavatoryGalleyDetails" | "cabinAmenities" | "range" | "cruiseSpeed" | "maxAltitude" | "runwayLength" | "emptyWeight" | "maxTakeoffWeight" | "deliveryAvailability" | "paymentTxSignature" | "transactionLink" | "vendorId" | "views" | "status" | "sponsored" | "sponsoredType" | "end_date", ExtArgs["result"]["jet"]>

  export type $JetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Jet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      manufacturer: string
      otherManufacturer: string | null
      model: string
      year: number
      serialNumber: string
      totalTimeSinceNew: number
      totalLandings: number
      engineMakeModel: string
      engineHours: number
      avionicsSuite: string
      interiorConfig: string
      interiorImageUrls: string[]
      exteriorImageUrls: string[]
      price: string
      currentLocation: string
      registrationNumber: string
      contactDetails: string
      aircraftType: string
      seatingCapacity: number
      cabinHeight: number
      cabinWidth: number
      cabinLength: number
      baggageCapacity: number
      numberOfEngines: number
      engineType: string
      engineThrust: number
      certification: string
      noiseCompliance: string
      lastInspectionDate: Date
      nextInspectionDue: Date
      maintenanceStatus: string
      previousOwners: number | null
      maintenanceProgram: string | null
      airframeEngineStatus: string | null
      refurbishmentDate: string | null
      wifiConnectivity: string | null
      lavatoryGalleyDetails: string | null
      cabinAmenities: string | null
      range: number | null
      cruiseSpeed: number | null
      maxAltitude: number | null
      runwayLength: number | null
      emptyWeight: number | null
      maxTakeoffWeight: number | null
      deliveryAvailability: string | null
      paymentTxSignature: string
      transactionLink: string | null
      vendorId: string
      views: number
      status: string
      sponsored: boolean
      sponsoredType: string
      end_date: Date
    }, ExtArgs["result"]["jet"]>
    composites: {}
  }

  type JetGetPayload<S extends boolean | null | undefined | JetDefaultArgs> = $Result.GetResult<Prisma.$JetPayload, S>

  type JetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JetCountAggregateInputType | true
    }

  export interface JetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Jet'], meta: { name: 'Jet' } }
    /**
     * Find zero or one Jet that matches the filter.
     * @param {JetFindUniqueArgs} args - Arguments to find a Jet
     * @example
     * // Get one Jet
     * const jet = await prisma.jet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JetFindUniqueArgs>(args: SelectSubset<T, JetFindUniqueArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Jet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JetFindUniqueOrThrowArgs} args - Arguments to find a Jet
     * @example
     * // Get one Jet
     * const jet = await prisma.jet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JetFindUniqueOrThrowArgs>(args: SelectSubset<T, JetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetFindFirstArgs} args - Arguments to find a Jet
     * @example
     * // Get one Jet
     * const jet = await prisma.jet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JetFindFirstArgs>(args?: SelectSubset<T, JetFindFirstArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetFindFirstOrThrowArgs} args - Arguments to find a Jet
     * @example
     * // Get one Jet
     * const jet = await prisma.jet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JetFindFirstOrThrowArgs>(args?: SelectSubset<T, JetFindFirstOrThrowArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jets
     * const jets = await prisma.jet.findMany()
     * 
     * // Get first 10 Jets
     * const jets = await prisma.jet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jetWithIdOnly = await prisma.jet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JetFindManyArgs>(args?: SelectSubset<T, JetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Jet.
     * @param {JetCreateArgs} args - Arguments to create a Jet.
     * @example
     * // Create one Jet
     * const Jet = await prisma.jet.create({
     *   data: {
     *     // ... data to create a Jet
     *   }
     * })
     * 
     */
    create<T extends JetCreateArgs>(args: SelectSubset<T, JetCreateArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jets.
     * @param {JetCreateManyArgs} args - Arguments to create many Jets.
     * @example
     * // Create many Jets
     * const jet = await prisma.jet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JetCreateManyArgs>(args?: SelectSubset<T, JetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jets and returns the data saved in the database.
     * @param {JetCreateManyAndReturnArgs} args - Arguments to create many Jets.
     * @example
     * // Create many Jets
     * const jet = await prisma.jet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jets and only return the `id`
     * const jetWithIdOnly = await prisma.jet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JetCreateManyAndReturnArgs>(args?: SelectSubset<T, JetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Jet.
     * @param {JetDeleteArgs} args - Arguments to delete one Jet.
     * @example
     * // Delete one Jet
     * const Jet = await prisma.jet.delete({
     *   where: {
     *     // ... filter to delete one Jet
     *   }
     * })
     * 
     */
    delete<T extends JetDeleteArgs>(args: SelectSubset<T, JetDeleteArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Jet.
     * @param {JetUpdateArgs} args - Arguments to update one Jet.
     * @example
     * // Update one Jet
     * const jet = await prisma.jet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JetUpdateArgs>(args: SelectSubset<T, JetUpdateArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jets.
     * @param {JetDeleteManyArgs} args - Arguments to filter Jets to delete.
     * @example
     * // Delete a few Jets
     * const { count } = await prisma.jet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JetDeleteManyArgs>(args?: SelectSubset<T, JetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jets
     * const jet = await prisma.jet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JetUpdateManyArgs>(args: SelectSubset<T, JetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jets and returns the data updated in the database.
     * @param {JetUpdateManyAndReturnArgs} args - Arguments to update many Jets.
     * @example
     * // Update many Jets
     * const jet = await prisma.jet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jets and only return the `id`
     * const jetWithIdOnly = await prisma.jet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JetUpdateManyAndReturnArgs>(args: SelectSubset<T, JetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Jet.
     * @param {JetUpsertArgs} args - Arguments to update or create a Jet.
     * @example
     * // Update or create a Jet
     * const jet = await prisma.jet.upsert({
     *   create: {
     *     // ... data to create a Jet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jet we want to update
     *   }
     * })
     */
    upsert<T extends JetUpsertArgs>(args: SelectSubset<T, JetUpsertArgs<ExtArgs>>): Prisma__JetClient<$Result.GetResult<Prisma.$JetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetCountArgs} args - Arguments to filter Jets to count.
     * @example
     * // Count the number of Jets
     * const count = await prisma.jet.count({
     *   where: {
     *     // ... the filter for the Jets we want to count
     *   }
     * })
    **/
    count<T extends JetCountArgs>(
      args?: Subset<T, JetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JetAggregateArgs>(args: Subset<T, JetAggregateArgs>): Prisma.PrismaPromise<GetJetAggregateType<T>>

    /**
     * Group by Jet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JetGroupByArgs['orderBy'] }
        : { orderBy?: JetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Jet model
   */
  readonly fields: JetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Jet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Jet model
   */
  interface JetFieldRefs {
    readonly id: FieldRef<"Jet", 'String'>
    readonly createdAt: FieldRef<"Jet", 'DateTime'>
    readonly manufacturer: FieldRef<"Jet", 'String'>
    readonly otherManufacturer: FieldRef<"Jet", 'String'>
    readonly model: FieldRef<"Jet", 'String'>
    readonly year: FieldRef<"Jet", 'Int'>
    readonly serialNumber: FieldRef<"Jet", 'String'>
    readonly totalTimeSinceNew: FieldRef<"Jet", 'Int'>
    readonly totalLandings: FieldRef<"Jet", 'Int'>
    readonly engineMakeModel: FieldRef<"Jet", 'String'>
    readonly engineHours: FieldRef<"Jet", 'Int'>
    readonly avionicsSuite: FieldRef<"Jet", 'String'>
    readonly interiorConfig: FieldRef<"Jet", 'String'>
    readonly interiorImageUrls: FieldRef<"Jet", 'String[]'>
    readonly exteriorImageUrls: FieldRef<"Jet", 'String[]'>
    readonly price: FieldRef<"Jet", 'String'>
    readonly currentLocation: FieldRef<"Jet", 'String'>
    readonly registrationNumber: FieldRef<"Jet", 'String'>
    readonly contactDetails: FieldRef<"Jet", 'String'>
    readonly aircraftType: FieldRef<"Jet", 'String'>
    readonly seatingCapacity: FieldRef<"Jet", 'Int'>
    readonly cabinHeight: FieldRef<"Jet", 'Float'>
    readonly cabinWidth: FieldRef<"Jet", 'Float'>
    readonly cabinLength: FieldRef<"Jet", 'Float'>
    readonly baggageCapacity: FieldRef<"Jet", 'Float'>
    readonly numberOfEngines: FieldRef<"Jet", 'Int'>
    readonly engineType: FieldRef<"Jet", 'String'>
    readonly engineThrust: FieldRef<"Jet", 'Float'>
    readonly certification: FieldRef<"Jet", 'String'>
    readonly noiseCompliance: FieldRef<"Jet", 'String'>
    readonly lastInspectionDate: FieldRef<"Jet", 'DateTime'>
    readonly nextInspectionDue: FieldRef<"Jet", 'DateTime'>
    readonly maintenanceStatus: FieldRef<"Jet", 'String'>
    readonly previousOwners: FieldRef<"Jet", 'Int'>
    readonly maintenanceProgram: FieldRef<"Jet", 'String'>
    readonly airframeEngineStatus: FieldRef<"Jet", 'String'>
    readonly refurbishmentDate: FieldRef<"Jet", 'String'>
    readonly wifiConnectivity: FieldRef<"Jet", 'String'>
    readonly lavatoryGalleyDetails: FieldRef<"Jet", 'String'>
    readonly cabinAmenities: FieldRef<"Jet", 'String'>
    readonly range: FieldRef<"Jet", 'Float'>
    readonly cruiseSpeed: FieldRef<"Jet", 'Float'>
    readonly maxAltitude: FieldRef<"Jet", 'Float'>
    readonly runwayLength: FieldRef<"Jet", 'Float'>
    readonly emptyWeight: FieldRef<"Jet", 'Float'>
    readonly maxTakeoffWeight: FieldRef<"Jet", 'Float'>
    readonly deliveryAvailability: FieldRef<"Jet", 'String'>
    readonly paymentTxSignature: FieldRef<"Jet", 'String'>
    readonly transactionLink: FieldRef<"Jet", 'String'>
    readonly vendorId: FieldRef<"Jet", 'String'>
    readonly views: FieldRef<"Jet", 'Int'>
    readonly status: FieldRef<"Jet", 'String'>
    readonly sponsored: FieldRef<"Jet", 'Boolean'>
    readonly sponsoredType: FieldRef<"Jet", 'String'>
    readonly end_date: FieldRef<"Jet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Jet findUnique
   */
  export type JetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * Filter, which Jet to fetch.
     */
    where: JetWhereUniqueInput
  }

  /**
   * Jet findUniqueOrThrow
   */
  export type JetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * Filter, which Jet to fetch.
     */
    where: JetWhereUniqueInput
  }

  /**
   * Jet findFirst
   */
  export type JetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * Filter, which Jet to fetch.
     */
    where?: JetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jets to fetch.
     */
    orderBy?: JetOrderByWithRelationInput | JetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jets.
     */
    cursor?: JetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jets.
     */
    distinct?: JetScalarFieldEnum | JetScalarFieldEnum[]
  }

  /**
   * Jet findFirstOrThrow
   */
  export type JetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * Filter, which Jet to fetch.
     */
    where?: JetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jets to fetch.
     */
    orderBy?: JetOrderByWithRelationInput | JetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jets.
     */
    cursor?: JetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jets.
     */
    distinct?: JetScalarFieldEnum | JetScalarFieldEnum[]
  }

  /**
   * Jet findMany
   */
  export type JetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * Filter, which Jets to fetch.
     */
    where?: JetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jets to fetch.
     */
    orderBy?: JetOrderByWithRelationInput | JetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jets.
     */
    cursor?: JetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jets.
     */
    skip?: number
    distinct?: JetScalarFieldEnum | JetScalarFieldEnum[]
  }

  /**
   * Jet create
   */
  export type JetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * The data needed to create a Jet.
     */
    data: XOR<JetCreateInput, JetUncheckedCreateInput>
  }

  /**
   * Jet createMany
   */
  export type JetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jets.
     */
    data: JetCreateManyInput | JetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Jet createManyAndReturn
   */
  export type JetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * The data used to create many Jets.
     */
    data: JetCreateManyInput | JetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Jet update
   */
  export type JetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * The data needed to update a Jet.
     */
    data: XOR<JetUpdateInput, JetUncheckedUpdateInput>
    /**
     * Choose, which Jet to update.
     */
    where: JetWhereUniqueInput
  }

  /**
   * Jet updateMany
   */
  export type JetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jets.
     */
    data: XOR<JetUpdateManyMutationInput, JetUncheckedUpdateManyInput>
    /**
     * Filter which Jets to update
     */
    where?: JetWhereInput
    /**
     * Limit how many Jets to update.
     */
    limit?: number
  }

  /**
   * Jet updateManyAndReturn
   */
  export type JetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * The data used to update Jets.
     */
    data: XOR<JetUpdateManyMutationInput, JetUncheckedUpdateManyInput>
    /**
     * Filter which Jets to update
     */
    where?: JetWhereInput
    /**
     * Limit how many Jets to update.
     */
    limit?: number
  }

  /**
   * Jet upsert
   */
  export type JetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * The filter to search for the Jet to update in case it exists.
     */
    where: JetWhereUniqueInput
    /**
     * In case the Jet found by the `where` argument doesn't exist, create a new Jet with this data.
     */
    create: XOR<JetCreateInput, JetUncheckedCreateInput>
    /**
     * In case the Jet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JetUpdateInput, JetUncheckedUpdateInput>
  }

  /**
   * Jet delete
   */
  export type JetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
    /**
     * Filter which Jet to delete.
     */
    where: JetWhereUniqueInput
  }

  /**
   * Jet deleteMany
   */
  export type JetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jets to delete
     */
    where?: JetWhereInput
    /**
     * Limit how many Jets to delete.
     */
    limit?: number
  }

  /**
   * Jet without action
   */
  export type JetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jet
     */
    select?: JetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jet
     */
    omit?: JetOmit<ExtArgs> | null
  }


  /**
   * Model JetForBids
   */

  export type AggregateJetForBids = {
    _count: JetForBidsCountAggregateOutputType | null
    _avg: JetForBidsAvgAggregateOutputType | null
    _sum: JetForBidsSumAggregateOutputType | null
    _min: JetForBidsMinAggregateOutputType | null
    _max: JetForBidsMaxAggregateOutputType | null
  }

  export type JetForBidsAvgAggregateOutputType = {
    year: number | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineHours: number | null
    previousOwners: number | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    views: number | null
    minimumBidIncrement: number | null
    currentBid: number | null
    bidCount: number | null
  }

  export type JetForBidsSumAggregateOutputType = {
    year: number | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineHours: number | null
    previousOwners: number | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    views: number | null
    minimumBidIncrement: number | null
    currentBid: number | null
    bidCount: number | null
  }

  export type JetForBidsMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    manufacturer: string | null
    otherManufacturer: string | null
    model: string | null
    year: number | null
    serialNumber: string | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineMakeModel: string | null
    engineHours: number | null
    avionicsSuite: string | null
    interiorConfig: string | null
    price: string | null
    currentLocation: string | null
    registrationNumber: string | null
    contactDetails: string | null
    previousOwners: number | null
    maintenanceProgram: string | null
    airframeEngineStatus: string | null
    refurbishmentDate: string | null
    wifiConnectivity: string | null
    lavatoryGalleyDetails: string | null
    cabinAmenities: string | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    deliveryAvailability: string | null
    vendorId: string | null
    views: number | null
    status: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    end_date: Date | null
    biddingEndDate: Date | null
    minimumBidIncrement: number | null
    biddingStatus: string | null
    currentBid: number | null
    bidCount: number | null
  }

  export type JetForBidsMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    manufacturer: string | null
    otherManufacturer: string | null
    model: string | null
    year: number | null
    serialNumber: string | null
    totalTimeSinceNew: number | null
    totalLandings: number | null
    engineMakeModel: string | null
    engineHours: number | null
    avionicsSuite: string | null
    interiorConfig: string | null
    price: string | null
    currentLocation: string | null
    registrationNumber: string | null
    contactDetails: string | null
    previousOwners: number | null
    maintenanceProgram: string | null
    airframeEngineStatus: string | null
    refurbishmentDate: string | null
    wifiConnectivity: string | null
    lavatoryGalleyDetails: string | null
    cabinAmenities: string | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    deliveryAvailability: string | null
    vendorId: string | null
    views: number | null
    status: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    end_date: Date | null
    biddingEndDate: Date | null
    minimumBidIncrement: number | null
    biddingStatus: string | null
    currentBid: number | null
    bidCount: number | null
  }

  export type JetForBidsCountAggregateOutputType = {
    id: number
    createdAt: number
    manufacturer: number
    otherManufacturer: number
    model: number
    year: number
    serialNumber: number
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: number
    engineHours: number
    avionicsSuite: number
    interiorConfig: number
    interiorImageUrls: number
    exteriorImageUrls: number
    price: number
    currentLocation: number
    registrationNumber: number
    contactDetails: number
    previousOwners: number
    maintenanceProgram: number
    airframeEngineStatus: number
    refurbishmentDate: number
    wifiConnectivity: number
    lavatoryGalleyDetails: number
    cabinAmenities: number
    range: number
    cruiseSpeed: number
    maxAltitude: number
    runwayLength: number
    emptyWeight: number
    maxTakeoffWeight: number
    deliveryAvailability: number
    vendorId: number
    views: number
    status: number
    sponsored: number
    sponsoredType: number
    end_date: number
    biddingEndDate: number
    minimumBidIncrement: number
    biddingStatus: number
    currentBid: number
    bidCount: number
    _all: number
  }


  export type JetForBidsAvgAggregateInputType = {
    year?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineHours?: true
    previousOwners?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    views?: true
    minimumBidIncrement?: true
    currentBid?: true
    bidCount?: true
  }

  export type JetForBidsSumAggregateInputType = {
    year?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineHours?: true
    previousOwners?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    views?: true
    minimumBidIncrement?: true
    currentBid?: true
    bidCount?: true
  }

  export type JetForBidsMinAggregateInputType = {
    id?: true
    createdAt?: true
    manufacturer?: true
    otherManufacturer?: true
    model?: true
    year?: true
    serialNumber?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineMakeModel?: true
    engineHours?: true
    avionicsSuite?: true
    interiorConfig?: true
    price?: true
    currentLocation?: true
    registrationNumber?: true
    contactDetails?: true
    previousOwners?: true
    maintenanceProgram?: true
    airframeEngineStatus?: true
    refurbishmentDate?: true
    wifiConnectivity?: true
    lavatoryGalleyDetails?: true
    cabinAmenities?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    deliveryAvailability?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    end_date?: true
    biddingEndDate?: true
    minimumBidIncrement?: true
    biddingStatus?: true
    currentBid?: true
    bidCount?: true
  }

  export type JetForBidsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    manufacturer?: true
    otherManufacturer?: true
    model?: true
    year?: true
    serialNumber?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineMakeModel?: true
    engineHours?: true
    avionicsSuite?: true
    interiorConfig?: true
    price?: true
    currentLocation?: true
    registrationNumber?: true
    contactDetails?: true
    previousOwners?: true
    maintenanceProgram?: true
    airframeEngineStatus?: true
    refurbishmentDate?: true
    wifiConnectivity?: true
    lavatoryGalleyDetails?: true
    cabinAmenities?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    deliveryAvailability?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    end_date?: true
    biddingEndDate?: true
    minimumBidIncrement?: true
    biddingStatus?: true
    currentBid?: true
    bidCount?: true
  }

  export type JetForBidsCountAggregateInputType = {
    id?: true
    createdAt?: true
    manufacturer?: true
    otherManufacturer?: true
    model?: true
    year?: true
    serialNumber?: true
    totalTimeSinceNew?: true
    totalLandings?: true
    engineMakeModel?: true
    engineHours?: true
    avionicsSuite?: true
    interiorConfig?: true
    interiorImageUrls?: true
    exteriorImageUrls?: true
    price?: true
    currentLocation?: true
    registrationNumber?: true
    contactDetails?: true
    previousOwners?: true
    maintenanceProgram?: true
    airframeEngineStatus?: true
    refurbishmentDate?: true
    wifiConnectivity?: true
    lavatoryGalleyDetails?: true
    cabinAmenities?: true
    range?: true
    cruiseSpeed?: true
    maxAltitude?: true
    runwayLength?: true
    emptyWeight?: true
    maxTakeoffWeight?: true
    deliveryAvailability?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    end_date?: true
    biddingEndDate?: true
    minimumBidIncrement?: true
    biddingStatus?: true
    currentBid?: true
    bidCount?: true
    _all?: true
  }

  export type JetForBidsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForBids to aggregate.
     */
    where?: JetForBidsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForBids to fetch.
     */
    orderBy?: JetForBidsOrderByWithRelationInput | JetForBidsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JetForBidsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForBids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForBids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JetForBids
    **/
    _count?: true | JetForBidsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JetForBidsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JetForBidsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JetForBidsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JetForBidsMaxAggregateInputType
  }

  export type GetJetForBidsAggregateType<T extends JetForBidsAggregateArgs> = {
        [P in keyof T & keyof AggregateJetForBids]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJetForBids[P]>
      : GetScalarType<T[P], AggregateJetForBids[P]>
  }




  export type JetForBidsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JetForBidsWhereInput
    orderBy?: JetForBidsOrderByWithAggregationInput | JetForBidsOrderByWithAggregationInput[]
    by: JetForBidsScalarFieldEnum[] | JetForBidsScalarFieldEnum
    having?: JetForBidsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JetForBidsCountAggregateInputType | true
    _avg?: JetForBidsAvgAggregateInputType
    _sum?: JetForBidsSumAggregateInputType
    _min?: JetForBidsMinAggregateInputType
    _max?: JetForBidsMaxAggregateInputType
  }

  export type JetForBidsGroupByOutputType = {
    id: string
    createdAt: Date
    manufacturer: string
    otherManufacturer: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls: string[]
    exteriorImageUrls: string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    previousOwners: number | null
    maintenanceProgram: string | null
    airframeEngineStatus: string | null
    refurbishmentDate: string | null
    wifiConnectivity: string | null
    lavatoryGalleyDetails: string | null
    cabinAmenities: string | null
    range: number | null
    cruiseSpeed: number | null
    maxAltitude: number | null
    runwayLength: number | null
    emptyWeight: number | null
    maxTakeoffWeight: number | null
    deliveryAvailability: string | null
    vendorId: string
    views: number
    status: string
    sponsored: boolean
    sponsoredType: string
    end_date: Date
    biddingEndDate: Date
    minimumBidIncrement: number
    biddingStatus: string
    currentBid: number | null
    bidCount: number
    _count: JetForBidsCountAggregateOutputType | null
    _avg: JetForBidsAvgAggregateOutputType | null
    _sum: JetForBidsSumAggregateOutputType | null
    _min: JetForBidsMinAggregateOutputType | null
    _max: JetForBidsMaxAggregateOutputType | null
  }

  type GetJetForBidsGroupByPayload<T extends JetForBidsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JetForBidsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JetForBidsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JetForBidsGroupByOutputType[P]>
            : GetScalarType<T[P], JetForBidsGroupByOutputType[P]>
        }
      >
    >


  export type JetForBidsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
    biddingEndDate?: boolean
    minimumBidIncrement?: boolean
    biddingStatus?: boolean
    currentBid?: boolean
    bidCount?: boolean
  }, ExtArgs["result"]["jetForBids"]>

  export type JetForBidsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
    biddingEndDate?: boolean
    minimumBidIncrement?: boolean
    biddingStatus?: boolean
    currentBid?: boolean
    bidCount?: boolean
  }, ExtArgs["result"]["jetForBids"]>

  export type JetForBidsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
    biddingEndDate?: boolean
    minimumBidIncrement?: boolean
    biddingStatus?: boolean
    currentBid?: boolean
    bidCount?: boolean
  }, ExtArgs["result"]["jetForBids"]>

  export type JetForBidsSelectScalar = {
    id?: boolean
    createdAt?: boolean
    manufacturer?: boolean
    otherManufacturer?: boolean
    model?: boolean
    year?: boolean
    serialNumber?: boolean
    totalTimeSinceNew?: boolean
    totalLandings?: boolean
    engineMakeModel?: boolean
    engineHours?: boolean
    avionicsSuite?: boolean
    interiorConfig?: boolean
    interiorImageUrls?: boolean
    exteriorImageUrls?: boolean
    price?: boolean
    currentLocation?: boolean
    registrationNumber?: boolean
    contactDetails?: boolean
    previousOwners?: boolean
    maintenanceProgram?: boolean
    airframeEngineStatus?: boolean
    refurbishmentDate?: boolean
    wifiConnectivity?: boolean
    lavatoryGalleyDetails?: boolean
    cabinAmenities?: boolean
    range?: boolean
    cruiseSpeed?: boolean
    maxAltitude?: boolean
    runwayLength?: boolean
    emptyWeight?: boolean
    maxTakeoffWeight?: boolean
    deliveryAvailability?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    end_date?: boolean
    biddingEndDate?: boolean
    minimumBidIncrement?: boolean
    biddingStatus?: boolean
    currentBid?: boolean
    bidCount?: boolean
  }

  export type JetForBidsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "manufacturer" | "otherManufacturer" | "model" | "year" | "serialNumber" | "totalTimeSinceNew" | "totalLandings" | "engineMakeModel" | "engineHours" | "avionicsSuite" | "interiorConfig" | "interiorImageUrls" | "exteriorImageUrls" | "price" | "currentLocation" | "registrationNumber" | "contactDetails" | "previousOwners" | "maintenanceProgram" | "airframeEngineStatus" | "refurbishmentDate" | "wifiConnectivity" | "lavatoryGalleyDetails" | "cabinAmenities" | "range" | "cruiseSpeed" | "maxAltitude" | "runwayLength" | "emptyWeight" | "maxTakeoffWeight" | "deliveryAvailability" | "vendorId" | "views" | "status" | "sponsored" | "sponsoredType" | "end_date" | "biddingEndDate" | "minimumBidIncrement" | "biddingStatus" | "currentBid" | "bidCount", ExtArgs["result"]["jetForBids"]>

  export type $JetForBidsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JetForBids"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      manufacturer: string
      otherManufacturer: string | null
      model: string
      year: number
      serialNumber: string
      totalTimeSinceNew: number
      totalLandings: number
      engineMakeModel: string
      engineHours: number
      avionicsSuite: string
      interiorConfig: string
      interiorImageUrls: string[]
      exteriorImageUrls: string[]
      price: string
      currentLocation: string
      registrationNumber: string
      contactDetails: string
      previousOwners: number | null
      maintenanceProgram: string | null
      airframeEngineStatus: string | null
      refurbishmentDate: string | null
      wifiConnectivity: string | null
      lavatoryGalleyDetails: string | null
      cabinAmenities: string | null
      range: number | null
      cruiseSpeed: number | null
      maxAltitude: number | null
      runwayLength: number | null
      emptyWeight: number | null
      maxTakeoffWeight: number | null
      deliveryAvailability: string | null
      vendorId: string
      views: number
      status: string
      sponsored: boolean
      sponsoredType: string
      end_date: Date
      biddingEndDate: Date
      minimumBidIncrement: number
      biddingStatus: string
      currentBid: number | null
      bidCount: number
    }, ExtArgs["result"]["jetForBids"]>
    composites: {}
  }

  type JetForBidsGetPayload<S extends boolean | null | undefined | JetForBidsDefaultArgs> = $Result.GetResult<Prisma.$JetForBidsPayload, S>

  type JetForBidsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JetForBidsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JetForBidsCountAggregateInputType | true
    }

  export interface JetForBidsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JetForBids'], meta: { name: 'JetForBids' } }
    /**
     * Find zero or one JetForBids that matches the filter.
     * @param {JetForBidsFindUniqueArgs} args - Arguments to find a JetForBids
     * @example
     * // Get one JetForBids
     * const jetForBids = await prisma.jetForBids.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JetForBidsFindUniqueArgs>(args: SelectSubset<T, JetForBidsFindUniqueArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JetForBids that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JetForBidsFindUniqueOrThrowArgs} args - Arguments to find a JetForBids
     * @example
     * // Get one JetForBids
     * const jetForBids = await prisma.jetForBids.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JetForBidsFindUniqueOrThrowArgs>(args: SelectSubset<T, JetForBidsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForBids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsFindFirstArgs} args - Arguments to find a JetForBids
     * @example
     * // Get one JetForBids
     * const jetForBids = await prisma.jetForBids.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JetForBidsFindFirstArgs>(args?: SelectSubset<T, JetForBidsFindFirstArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForBids that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsFindFirstOrThrowArgs} args - Arguments to find a JetForBids
     * @example
     * // Get one JetForBids
     * const jetForBids = await prisma.jetForBids.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JetForBidsFindFirstOrThrowArgs>(args?: SelectSubset<T, JetForBidsFindFirstOrThrowArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JetForBids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JetForBids
     * const jetForBids = await prisma.jetForBids.findMany()
     * 
     * // Get first 10 JetForBids
     * const jetForBids = await prisma.jetForBids.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jetForBidsWithIdOnly = await prisma.jetForBids.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JetForBidsFindManyArgs>(args?: SelectSubset<T, JetForBidsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JetForBids.
     * @param {JetForBidsCreateArgs} args - Arguments to create a JetForBids.
     * @example
     * // Create one JetForBids
     * const JetForBids = await prisma.jetForBids.create({
     *   data: {
     *     // ... data to create a JetForBids
     *   }
     * })
     * 
     */
    create<T extends JetForBidsCreateArgs>(args: SelectSubset<T, JetForBidsCreateArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JetForBids.
     * @param {JetForBidsCreateManyArgs} args - Arguments to create many JetForBids.
     * @example
     * // Create many JetForBids
     * const jetForBids = await prisma.jetForBids.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JetForBidsCreateManyArgs>(args?: SelectSubset<T, JetForBidsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JetForBids and returns the data saved in the database.
     * @param {JetForBidsCreateManyAndReturnArgs} args - Arguments to create many JetForBids.
     * @example
     * // Create many JetForBids
     * const jetForBids = await prisma.jetForBids.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JetForBids and only return the `id`
     * const jetForBidsWithIdOnly = await prisma.jetForBids.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JetForBidsCreateManyAndReturnArgs>(args?: SelectSubset<T, JetForBidsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JetForBids.
     * @param {JetForBidsDeleteArgs} args - Arguments to delete one JetForBids.
     * @example
     * // Delete one JetForBids
     * const JetForBids = await prisma.jetForBids.delete({
     *   where: {
     *     // ... filter to delete one JetForBids
     *   }
     * })
     * 
     */
    delete<T extends JetForBidsDeleteArgs>(args: SelectSubset<T, JetForBidsDeleteArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JetForBids.
     * @param {JetForBidsUpdateArgs} args - Arguments to update one JetForBids.
     * @example
     * // Update one JetForBids
     * const jetForBids = await prisma.jetForBids.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JetForBidsUpdateArgs>(args: SelectSubset<T, JetForBidsUpdateArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JetForBids.
     * @param {JetForBidsDeleteManyArgs} args - Arguments to filter JetForBids to delete.
     * @example
     * // Delete a few JetForBids
     * const { count } = await prisma.jetForBids.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JetForBidsDeleteManyArgs>(args?: SelectSubset<T, JetForBidsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForBids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JetForBids
     * const jetForBids = await prisma.jetForBids.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JetForBidsUpdateManyArgs>(args: SelectSubset<T, JetForBidsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForBids and returns the data updated in the database.
     * @param {JetForBidsUpdateManyAndReturnArgs} args - Arguments to update many JetForBids.
     * @example
     * // Update many JetForBids
     * const jetForBids = await prisma.jetForBids.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JetForBids and only return the `id`
     * const jetForBidsWithIdOnly = await prisma.jetForBids.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JetForBidsUpdateManyAndReturnArgs>(args: SelectSubset<T, JetForBidsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JetForBids.
     * @param {JetForBidsUpsertArgs} args - Arguments to update or create a JetForBids.
     * @example
     * // Update or create a JetForBids
     * const jetForBids = await prisma.jetForBids.upsert({
     *   create: {
     *     // ... data to create a JetForBids
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JetForBids we want to update
     *   }
     * })
     */
    upsert<T extends JetForBidsUpsertArgs>(args: SelectSubset<T, JetForBidsUpsertArgs<ExtArgs>>): Prisma__JetForBidsClient<$Result.GetResult<Prisma.$JetForBidsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JetForBids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsCountArgs} args - Arguments to filter JetForBids to count.
     * @example
     * // Count the number of JetForBids
     * const count = await prisma.jetForBids.count({
     *   where: {
     *     // ... the filter for the JetForBids we want to count
     *   }
     * })
    **/
    count<T extends JetForBidsCountArgs>(
      args?: Subset<T, JetForBidsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JetForBidsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JetForBids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JetForBidsAggregateArgs>(args: Subset<T, JetForBidsAggregateArgs>): Prisma.PrismaPromise<GetJetForBidsAggregateType<T>>

    /**
     * Group by JetForBids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForBidsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JetForBidsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JetForBidsGroupByArgs['orderBy'] }
        : { orderBy?: JetForBidsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JetForBidsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJetForBidsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JetForBids model
   */
  readonly fields: JetForBidsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JetForBids.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JetForBidsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JetForBids model
   */
  interface JetForBidsFieldRefs {
    readonly id: FieldRef<"JetForBids", 'String'>
    readonly createdAt: FieldRef<"JetForBids", 'DateTime'>
    readonly manufacturer: FieldRef<"JetForBids", 'String'>
    readonly otherManufacturer: FieldRef<"JetForBids", 'String'>
    readonly model: FieldRef<"JetForBids", 'String'>
    readonly year: FieldRef<"JetForBids", 'Int'>
    readonly serialNumber: FieldRef<"JetForBids", 'String'>
    readonly totalTimeSinceNew: FieldRef<"JetForBids", 'Int'>
    readonly totalLandings: FieldRef<"JetForBids", 'Int'>
    readonly engineMakeModel: FieldRef<"JetForBids", 'String'>
    readonly engineHours: FieldRef<"JetForBids", 'Int'>
    readonly avionicsSuite: FieldRef<"JetForBids", 'String'>
    readonly interiorConfig: FieldRef<"JetForBids", 'String'>
    readonly interiorImageUrls: FieldRef<"JetForBids", 'String[]'>
    readonly exteriorImageUrls: FieldRef<"JetForBids", 'String[]'>
    readonly price: FieldRef<"JetForBids", 'String'>
    readonly currentLocation: FieldRef<"JetForBids", 'String'>
    readonly registrationNumber: FieldRef<"JetForBids", 'String'>
    readonly contactDetails: FieldRef<"JetForBids", 'String'>
    readonly previousOwners: FieldRef<"JetForBids", 'Int'>
    readonly maintenanceProgram: FieldRef<"JetForBids", 'String'>
    readonly airframeEngineStatus: FieldRef<"JetForBids", 'String'>
    readonly refurbishmentDate: FieldRef<"JetForBids", 'String'>
    readonly wifiConnectivity: FieldRef<"JetForBids", 'String'>
    readonly lavatoryGalleyDetails: FieldRef<"JetForBids", 'String'>
    readonly cabinAmenities: FieldRef<"JetForBids", 'String'>
    readonly range: FieldRef<"JetForBids", 'Float'>
    readonly cruiseSpeed: FieldRef<"JetForBids", 'Float'>
    readonly maxAltitude: FieldRef<"JetForBids", 'Float'>
    readonly runwayLength: FieldRef<"JetForBids", 'Float'>
    readonly emptyWeight: FieldRef<"JetForBids", 'Float'>
    readonly maxTakeoffWeight: FieldRef<"JetForBids", 'Float'>
    readonly deliveryAvailability: FieldRef<"JetForBids", 'String'>
    readonly vendorId: FieldRef<"JetForBids", 'String'>
    readonly views: FieldRef<"JetForBids", 'Int'>
    readonly status: FieldRef<"JetForBids", 'String'>
    readonly sponsored: FieldRef<"JetForBids", 'Boolean'>
    readonly sponsoredType: FieldRef<"JetForBids", 'String'>
    readonly end_date: FieldRef<"JetForBids", 'DateTime'>
    readonly biddingEndDate: FieldRef<"JetForBids", 'DateTime'>
    readonly minimumBidIncrement: FieldRef<"JetForBids", 'Float'>
    readonly biddingStatus: FieldRef<"JetForBids", 'String'>
    readonly currentBid: FieldRef<"JetForBids", 'Float'>
    readonly bidCount: FieldRef<"JetForBids", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JetForBids findUnique
   */
  export type JetForBidsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * Filter, which JetForBids to fetch.
     */
    where: JetForBidsWhereUniqueInput
  }

  /**
   * JetForBids findUniqueOrThrow
   */
  export type JetForBidsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * Filter, which JetForBids to fetch.
     */
    where: JetForBidsWhereUniqueInput
  }

  /**
   * JetForBids findFirst
   */
  export type JetForBidsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * Filter, which JetForBids to fetch.
     */
    where?: JetForBidsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForBids to fetch.
     */
    orderBy?: JetForBidsOrderByWithRelationInput | JetForBidsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForBids.
     */
    cursor?: JetForBidsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForBids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForBids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForBids.
     */
    distinct?: JetForBidsScalarFieldEnum | JetForBidsScalarFieldEnum[]
  }

  /**
   * JetForBids findFirstOrThrow
   */
  export type JetForBidsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * Filter, which JetForBids to fetch.
     */
    where?: JetForBidsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForBids to fetch.
     */
    orderBy?: JetForBidsOrderByWithRelationInput | JetForBidsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForBids.
     */
    cursor?: JetForBidsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForBids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForBids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForBids.
     */
    distinct?: JetForBidsScalarFieldEnum | JetForBidsScalarFieldEnum[]
  }

  /**
   * JetForBids findMany
   */
  export type JetForBidsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * Filter, which JetForBids to fetch.
     */
    where?: JetForBidsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForBids to fetch.
     */
    orderBy?: JetForBidsOrderByWithRelationInput | JetForBidsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JetForBids.
     */
    cursor?: JetForBidsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForBids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForBids.
     */
    skip?: number
    distinct?: JetForBidsScalarFieldEnum | JetForBidsScalarFieldEnum[]
  }

  /**
   * JetForBids create
   */
  export type JetForBidsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * The data needed to create a JetForBids.
     */
    data: XOR<JetForBidsCreateInput, JetForBidsUncheckedCreateInput>
  }

  /**
   * JetForBids createMany
   */
  export type JetForBidsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JetForBids.
     */
    data: JetForBidsCreateManyInput | JetForBidsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForBids createManyAndReturn
   */
  export type JetForBidsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * The data used to create many JetForBids.
     */
    data: JetForBidsCreateManyInput | JetForBidsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForBids update
   */
  export type JetForBidsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * The data needed to update a JetForBids.
     */
    data: XOR<JetForBidsUpdateInput, JetForBidsUncheckedUpdateInput>
    /**
     * Choose, which JetForBids to update.
     */
    where: JetForBidsWhereUniqueInput
  }

  /**
   * JetForBids updateMany
   */
  export type JetForBidsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JetForBids.
     */
    data: XOR<JetForBidsUpdateManyMutationInput, JetForBidsUncheckedUpdateManyInput>
    /**
     * Filter which JetForBids to update
     */
    where?: JetForBidsWhereInput
    /**
     * Limit how many JetForBids to update.
     */
    limit?: number
  }

  /**
   * JetForBids updateManyAndReturn
   */
  export type JetForBidsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * The data used to update JetForBids.
     */
    data: XOR<JetForBidsUpdateManyMutationInput, JetForBidsUncheckedUpdateManyInput>
    /**
     * Filter which JetForBids to update
     */
    where?: JetForBidsWhereInput
    /**
     * Limit how many JetForBids to update.
     */
    limit?: number
  }

  /**
   * JetForBids upsert
   */
  export type JetForBidsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * The filter to search for the JetForBids to update in case it exists.
     */
    where: JetForBidsWhereUniqueInput
    /**
     * In case the JetForBids found by the `where` argument doesn't exist, create a new JetForBids with this data.
     */
    create: XOR<JetForBidsCreateInput, JetForBidsUncheckedCreateInput>
    /**
     * In case the JetForBids was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JetForBidsUpdateInput, JetForBidsUncheckedUpdateInput>
  }

  /**
   * JetForBids delete
   */
  export type JetForBidsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
    /**
     * Filter which JetForBids to delete.
     */
    where: JetForBidsWhereUniqueInput
  }

  /**
   * JetForBids deleteMany
   */
  export type JetForBidsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForBids to delete
     */
    where?: JetForBidsWhereInput
    /**
     * Limit how many JetForBids to delete.
     */
    limit?: number
  }

  /**
   * JetForBids without action
   */
  export type JetForBidsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForBids
     */
    select?: JetForBidsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForBids
     */
    omit?: JetForBidsOmit<ExtArgs> | null
  }


  /**
   * Model JetForCharter
   */

  export type AggregateJetForCharter = {
    _count: JetForCharterCountAggregateOutputType | null
    _avg: JetForCharterAvgAggregateOutputType | null
    _sum: JetForCharterSumAggregateOutputType | null
    _min: JetForCharterMinAggregateOutputType | null
    _max: JetForCharterMaxAggregateOutputType | null
  }

  export type JetForCharterAvgAggregateOutputType = {
    views: number | null
  }

  export type JetForCharterSumAggregateOutputType = {
    views: number | null
  }

  export type JetForCharterMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    jetName: string | null
    aircraftType: string | null
    manufacturer: string | null
    yearOfManufacture: string | null
    registrationNumber: string | null
    seatingCapacity: string | null
    cabinConfiguration: string | null
    maximumRange: string | null
    cruisingSpeed: string | null
    baggageCapacity: string | null
    homeBase: string | null
    availableRoutes: string | null
    operatingDays: string | null
    noticeRequired: string | null
    pricePerHour: string | null
    minimumFlightTime: string | null
    tripOption: $Enums.TripOption | null
    discounts: string | null
    inFlightMeals: boolean | null
    flightAttendant: boolean | null
    petsAllowed: boolean | null
    smokingAllowed: boolean | null
    videoLink: string | null
    luxuryCarService: boolean | null
    vendorId: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    endData: Date | null
    transactionSignature: string | null
    transactionLink: string | null
    status: string | null
    views: number | null
  }

  export type JetForCharterMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    jetName: string | null
    aircraftType: string | null
    manufacturer: string | null
    yearOfManufacture: string | null
    registrationNumber: string | null
    seatingCapacity: string | null
    cabinConfiguration: string | null
    maximumRange: string | null
    cruisingSpeed: string | null
    baggageCapacity: string | null
    homeBase: string | null
    availableRoutes: string | null
    operatingDays: string | null
    noticeRequired: string | null
    pricePerHour: string | null
    minimumFlightTime: string | null
    tripOption: $Enums.TripOption | null
    discounts: string | null
    inFlightMeals: boolean | null
    flightAttendant: boolean | null
    petsAllowed: boolean | null
    smokingAllowed: boolean | null
    videoLink: string | null
    luxuryCarService: boolean | null
    vendorId: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    endData: Date | null
    transactionSignature: string | null
    transactionLink: string | null
    status: string | null
    views: number | null
  }

  export type JetForCharterCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    jetName: number
    aircraftType: number
    manufacturer: number
    yearOfManufacture: number
    registrationNumber: number
    seatingCapacity: number
    cabinConfiguration: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: number
    homeBase: number
    availableRoutes: number
    operatingDays: number
    noticeRequired: number
    pricePerHour: number
    minimumFlightTime: number
    tripOption: number
    additionalFees: number
    discounts: number
    cabinFeatures: number
    inFlightMeals: number
    flightAttendant: number
    petsAllowed: number
    smokingAllowed: number
    exteriorImages: number
    interiorImages: number
    videoLink: number
    luxuryCarService: number
    vendorId: number
    sponsored: number
    sponsoredType: number
    endData: number
    transactionSignature: number
    transactionLink: number
    status: number
    views: number
    _all: number
  }


  export type JetForCharterAvgAggregateInputType = {
    views?: true
  }

  export type JetForCharterSumAggregateInputType = {
    views?: true
  }

  export type JetForCharterMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    jetName?: true
    aircraftType?: true
    manufacturer?: true
    yearOfManufacture?: true
    registrationNumber?: true
    seatingCapacity?: true
    cabinConfiguration?: true
    maximumRange?: true
    cruisingSpeed?: true
    baggageCapacity?: true
    homeBase?: true
    availableRoutes?: true
    operatingDays?: true
    noticeRequired?: true
    pricePerHour?: true
    minimumFlightTime?: true
    tripOption?: true
    discounts?: true
    inFlightMeals?: true
    flightAttendant?: true
    petsAllowed?: true
    smokingAllowed?: true
    videoLink?: true
    luxuryCarService?: true
    vendorId?: true
    sponsored?: true
    sponsoredType?: true
    endData?: true
    transactionSignature?: true
    transactionLink?: true
    status?: true
    views?: true
  }

  export type JetForCharterMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    jetName?: true
    aircraftType?: true
    manufacturer?: true
    yearOfManufacture?: true
    registrationNumber?: true
    seatingCapacity?: true
    cabinConfiguration?: true
    maximumRange?: true
    cruisingSpeed?: true
    baggageCapacity?: true
    homeBase?: true
    availableRoutes?: true
    operatingDays?: true
    noticeRequired?: true
    pricePerHour?: true
    minimumFlightTime?: true
    tripOption?: true
    discounts?: true
    inFlightMeals?: true
    flightAttendant?: true
    petsAllowed?: true
    smokingAllowed?: true
    videoLink?: true
    luxuryCarService?: true
    vendorId?: true
    sponsored?: true
    sponsoredType?: true
    endData?: true
    transactionSignature?: true
    transactionLink?: true
    status?: true
    views?: true
  }

  export type JetForCharterCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    jetName?: true
    aircraftType?: true
    manufacturer?: true
    yearOfManufacture?: true
    registrationNumber?: true
    seatingCapacity?: true
    cabinConfiguration?: true
    maximumRange?: true
    cruisingSpeed?: true
    baggageCapacity?: true
    homeBase?: true
    availableRoutes?: true
    operatingDays?: true
    noticeRequired?: true
    pricePerHour?: true
    minimumFlightTime?: true
    tripOption?: true
    additionalFees?: true
    discounts?: true
    cabinFeatures?: true
    inFlightMeals?: true
    flightAttendant?: true
    petsAllowed?: true
    smokingAllowed?: true
    exteriorImages?: true
    interiorImages?: true
    videoLink?: true
    luxuryCarService?: true
    vendorId?: true
    sponsored?: true
    sponsoredType?: true
    endData?: true
    transactionSignature?: true
    transactionLink?: true
    status?: true
    views?: true
    _all?: true
  }

  export type JetForCharterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForCharter to aggregate.
     */
    where?: JetForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharters to fetch.
     */
    orderBy?: JetForCharterOrderByWithRelationInput | JetForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JetForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JetForCharters
    **/
    _count?: true | JetForCharterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JetForCharterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JetForCharterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JetForCharterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JetForCharterMaxAggregateInputType
  }

  export type GetJetForCharterAggregateType<T extends JetForCharterAggregateArgs> = {
        [P in keyof T & keyof AggregateJetForCharter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJetForCharter[P]>
      : GetScalarType<T[P], AggregateJetForCharter[P]>
  }




  export type JetForCharterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JetForCharterWhereInput
    orderBy?: JetForCharterOrderByWithAggregationInput | JetForCharterOrderByWithAggregationInput[]
    by: JetForCharterScalarFieldEnum[] | JetForCharterScalarFieldEnum
    having?: JetForCharterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JetForCharterCountAggregateInputType | true
    _avg?: JetForCharterAvgAggregateInputType
    _sum?: JetForCharterSumAggregateInputType
    _min?: JetForCharterMinAggregateInputType
    _max?: JetForCharterMaxAggregateInputType
  }

  export type JetForCharterGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    jetName: string
    aircraftType: string
    manufacturer: string
    yearOfManufacture: string
    registrationNumber: string
    seatingCapacity: string
    cabinConfiguration: string
    maximumRange: string
    cruisingSpeed: string
    baggageCapacity: string
    homeBase: string
    availableRoutes: string
    operatingDays: string
    noticeRequired: string
    pricePerHour: string
    minimumFlightTime: string
    tripOption: $Enums.TripOption
    additionalFees: JsonValue
    discounts: string | null
    cabinFeatures: string[]
    inFlightMeals: boolean
    flightAttendant: boolean
    petsAllowed: boolean
    smokingAllowed: boolean
    exteriorImages: string[]
    interiorImages: string[]
    videoLink: string | null
    luxuryCarService: boolean
    vendorId: string
    sponsored: boolean
    sponsoredType: string
    endData: Date
    transactionSignature: string
    transactionLink: string
    status: string
    views: number
    _count: JetForCharterCountAggregateOutputType | null
    _avg: JetForCharterAvgAggregateOutputType | null
    _sum: JetForCharterSumAggregateOutputType | null
    _min: JetForCharterMinAggregateOutputType | null
    _max: JetForCharterMaxAggregateOutputType | null
  }

  type GetJetForCharterGroupByPayload<T extends JetForCharterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JetForCharterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JetForCharterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JetForCharterGroupByOutputType[P]>
            : GetScalarType<T[P], JetForCharterGroupByOutputType[P]>
        }
      >
    >


  export type JetForCharterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jetName?: boolean
    aircraftType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    seatingCapacity?: boolean
    cabinConfiguration?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    homeBase?: boolean
    availableRoutes?: boolean
    operatingDays?: boolean
    noticeRequired?: boolean
    pricePerHour?: boolean
    minimumFlightTime?: boolean
    tripOption?: boolean
    additionalFees?: boolean
    discounts?: boolean
    cabinFeatures?: boolean
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: boolean
    interiorImages?: boolean
    videoLink?: boolean
    luxuryCarService?: boolean
    vendorId?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endData?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    status?: boolean
    views?: boolean
  }, ExtArgs["result"]["jetForCharter"]>

  export type JetForCharterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jetName?: boolean
    aircraftType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    seatingCapacity?: boolean
    cabinConfiguration?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    homeBase?: boolean
    availableRoutes?: boolean
    operatingDays?: boolean
    noticeRequired?: boolean
    pricePerHour?: boolean
    minimumFlightTime?: boolean
    tripOption?: boolean
    additionalFees?: boolean
    discounts?: boolean
    cabinFeatures?: boolean
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: boolean
    interiorImages?: boolean
    videoLink?: boolean
    luxuryCarService?: boolean
    vendorId?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endData?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    status?: boolean
    views?: boolean
  }, ExtArgs["result"]["jetForCharter"]>

  export type JetForCharterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jetName?: boolean
    aircraftType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    seatingCapacity?: boolean
    cabinConfiguration?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    homeBase?: boolean
    availableRoutes?: boolean
    operatingDays?: boolean
    noticeRequired?: boolean
    pricePerHour?: boolean
    minimumFlightTime?: boolean
    tripOption?: boolean
    additionalFees?: boolean
    discounts?: boolean
    cabinFeatures?: boolean
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: boolean
    interiorImages?: boolean
    videoLink?: boolean
    luxuryCarService?: boolean
    vendorId?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endData?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    status?: boolean
    views?: boolean
  }, ExtArgs["result"]["jetForCharter"]>

  export type JetForCharterSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jetName?: boolean
    aircraftType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    seatingCapacity?: boolean
    cabinConfiguration?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    homeBase?: boolean
    availableRoutes?: boolean
    operatingDays?: boolean
    noticeRequired?: boolean
    pricePerHour?: boolean
    minimumFlightTime?: boolean
    tripOption?: boolean
    additionalFees?: boolean
    discounts?: boolean
    cabinFeatures?: boolean
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: boolean
    interiorImages?: boolean
    videoLink?: boolean
    luxuryCarService?: boolean
    vendorId?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endData?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    status?: boolean
    views?: boolean
  }

  export type JetForCharterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "jetName" | "aircraftType" | "manufacturer" | "yearOfManufacture" | "registrationNumber" | "seatingCapacity" | "cabinConfiguration" | "maximumRange" | "cruisingSpeed" | "baggageCapacity" | "homeBase" | "availableRoutes" | "operatingDays" | "noticeRequired" | "pricePerHour" | "minimumFlightTime" | "tripOption" | "additionalFees" | "discounts" | "cabinFeatures" | "inFlightMeals" | "flightAttendant" | "petsAllowed" | "smokingAllowed" | "exteriorImages" | "interiorImages" | "videoLink" | "luxuryCarService" | "vendorId" | "sponsored" | "sponsoredType" | "endData" | "transactionSignature" | "transactionLink" | "status" | "views", ExtArgs["result"]["jetForCharter"]>

  export type $JetForCharterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JetForCharter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      jetName: string
      aircraftType: string
      manufacturer: string
      yearOfManufacture: string
      registrationNumber: string
      seatingCapacity: string
      cabinConfiguration: string
      maximumRange: string
      cruisingSpeed: string
      baggageCapacity: string
      homeBase: string
      availableRoutes: string
      operatingDays: string
      noticeRequired: string
      pricePerHour: string
      minimumFlightTime: string
      tripOption: $Enums.TripOption
      additionalFees: Prisma.JsonValue
      discounts: string | null
      cabinFeatures: string[]
      inFlightMeals: boolean
      flightAttendant: boolean
      petsAllowed: boolean
      smokingAllowed: boolean
      exteriorImages: string[]
      interiorImages: string[]
      videoLink: string | null
      luxuryCarService: boolean
      vendorId: string
      sponsored: boolean
      sponsoredType: string
      endData: Date
      transactionSignature: string
      transactionLink: string
      status: string
      views: number
    }, ExtArgs["result"]["jetForCharter"]>
    composites: {}
  }

  type JetForCharterGetPayload<S extends boolean | null | undefined | JetForCharterDefaultArgs> = $Result.GetResult<Prisma.$JetForCharterPayload, S>

  type JetForCharterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JetForCharterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JetForCharterCountAggregateInputType | true
    }

  export interface JetForCharterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JetForCharter'], meta: { name: 'JetForCharter' } }
    /**
     * Find zero or one JetForCharter that matches the filter.
     * @param {JetForCharterFindUniqueArgs} args - Arguments to find a JetForCharter
     * @example
     * // Get one JetForCharter
     * const jetForCharter = await prisma.jetForCharter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JetForCharterFindUniqueArgs>(args: SelectSubset<T, JetForCharterFindUniqueArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JetForCharter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JetForCharterFindUniqueOrThrowArgs} args - Arguments to find a JetForCharter
     * @example
     * // Get one JetForCharter
     * const jetForCharter = await prisma.jetForCharter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JetForCharterFindUniqueOrThrowArgs>(args: SelectSubset<T, JetForCharterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForCharter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterFindFirstArgs} args - Arguments to find a JetForCharter
     * @example
     * // Get one JetForCharter
     * const jetForCharter = await prisma.jetForCharter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JetForCharterFindFirstArgs>(args?: SelectSubset<T, JetForCharterFindFirstArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForCharter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterFindFirstOrThrowArgs} args - Arguments to find a JetForCharter
     * @example
     * // Get one JetForCharter
     * const jetForCharter = await prisma.jetForCharter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JetForCharterFindFirstOrThrowArgs>(args?: SelectSubset<T, JetForCharterFindFirstOrThrowArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JetForCharters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JetForCharters
     * const jetForCharters = await prisma.jetForCharter.findMany()
     * 
     * // Get first 10 JetForCharters
     * const jetForCharters = await prisma.jetForCharter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jetForCharterWithIdOnly = await prisma.jetForCharter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JetForCharterFindManyArgs>(args?: SelectSubset<T, JetForCharterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JetForCharter.
     * @param {JetForCharterCreateArgs} args - Arguments to create a JetForCharter.
     * @example
     * // Create one JetForCharter
     * const JetForCharter = await prisma.jetForCharter.create({
     *   data: {
     *     // ... data to create a JetForCharter
     *   }
     * })
     * 
     */
    create<T extends JetForCharterCreateArgs>(args: SelectSubset<T, JetForCharterCreateArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JetForCharters.
     * @param {JetForCharterCreateManyArgs} args - Arguments to create many JetForCharters.
     * @example
     * // Create many JetForCharters
     * const jetForCharter = await prisma.jetForCharter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JetForCharterCreateManyArgs>(args?: SelectSubset<T, JetForCharterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JetForCharters and returns the data saved in the database.
     * @param {JetForCharterCreateManyAndReturnArgs} args - Arguments to create many JetForCharters.
     * @example
     * // Create many JetForCharters
     * const jetForCharter = await prisma.jetForCharter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JetForCharters and only return the `id`
     * const jetForCharterWithIdOnly = await prisma.jetForCharter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JetForCharterCreateManyAndReturnArgs>(args?: SelectSubset<T, JetForCharterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JetForCharter.
     * @param {JetForCharterDeleteArgs} args - Arguments to delete one JetForCharter.
     * @example
     * // Delete one JetForCharter
     * const JetForCharter = await prisma.jetForCharter.delete({
     *   where: {
     *     // ... filter to delete one JetForCharter
     *   }
     * })
     * 
     */
    delete<T extends JetForCharterDeleteArgs>(args: SelectSubset<T, JetForCharterDeleteArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JetForCharter.
     * @param {JetForCharterUpdateArgs} args - Arguments to update one JetForCharter.
     * @example
     * // Update one JetForCharter
     * const jetForCharter = await prisma.jetForCharter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JetForCharterUpdateArgs>(args: SelectSubset<T, JetForCharterUpdateArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JetForCharters.
     * @param {JetForCharterDeleteManyArgs} args - Arguments to filter JetForCharters to delete.
     * @example
     * // Delete a few JetForCharters
     * const { count } = await prisma.jetForCharter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JetForCharterDeleteManyArgs>(args?: SelectSubset<T, JetForCharterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForCharters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JetForCharters
     * const jetForCharter = await prisma.jetForCharter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JetForCharterUpdateManyArgs>(args: SelectSubset<T, JetForCharterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForCharters and returns the data updated in the database.
     * @param {JetForCharterUpdateManyAndReturnArgs} args - Arguments to update many JetForCharters.
     * @example
     * // Update many JetForCharters
     * const jetForCharter = await prisma.jetForCharter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JetForCharters and only return the `id`
     * const jetForCharterWithIdOnly = await prisma.jetForCharter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JetForCharterUpdateManyAndReturnArgs>(args: SelectSubset<T, JetForCharterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JetForCharter.
     * @param {JetForCharterUpsertArgs} args - Arguments to update or create a JetForCharter.
     * @example
     * // Update or create a JetForCharter
     * const jetForCharter = await prisma.jetForCharter.upsert({
     *   create: {
     *     // ... data to create a JetForCharter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JetForCharter we want to update
     *   }
     * })
     */
    upsert<T extends JetForCharterUpsertArgs>(args: SelectSubset<T, JetForCharterUpsertArgs<ExtArgs>>): Prisma__JetForCharterClient<$Result.GetResult<Prisma.$JetForCharterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JetForCharters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterCountArgs} args - Arguments to filter JetForCharters to count.
     * @example
     * // Count the number of JetForCharters
     * const count = await prisma.jetForCharter.count({
     *   where: {
     *     // ... the filter for the JetForCharters we want to count
     *   }
     * })
    **/
    count<T extends JetForCharterCountArgs>(
      args?: Subset<T, JetForCharterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JetForCharterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JetForCharter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JetForCharterAggregateArgs>(args: Subset<T, JetForCharterAggregateArgs>): Prisma.PrismaPromise<GetJetForCharterAggregateType<T>>

    /**
     * Group by JetForCharter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JetForCharterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JetForCharterGroupByArgs['orderBy'] }
        : { orderBy?: JetForCharterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JetForCharterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJetForCharterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JetForCharter model
   */
  readonly fields: JetForCharterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JetForCharter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JetForCharterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JetForCharter model
   */
  interface JetForCharterFieldRefs {
    readonly id: FieldRef<"JetForCharter", 'String'>
    readonly createdAt: FieldRef<"JetForCharter", 'DateTime'>
    readonly updatedAt: FieldRef<"JetForCharter", 'DateTime'>
    readonly jetName: FieldRef<"JetForCharter", 'String'>
    readonly aircraftType: FieldRef<"JetForCharter", 'String'>
    readonly manufacturer: FieldRef<"JetForCharter", 'String'>
    readonly yearOfManufacture: FieldRef<"JetForCharter", 'String'>
    readonly registrationNumber: FieldRef<"JetForCharter", 'String'>
    readonly seatingCapacity: FieldRef<"JetForCharter", 'String'>
    readonly cabinConfiguration: FieldRef<"JetForCharter", 'String'>
    readonly maximumRange: FieldRef<"JetForCharter", 'String'>
    readonly cruisingSpeed: FieldRef<"JetForCharter", 'String'>
    readonly baggageCapacity: FieldRef<"JetForCharter", 'String'>
    readonly homeBase: FieldRef<"JetForCharter", 'String'>
    readonly availableRoutes: FieldRef<"JetForCharter", 'String'>
    readonly operatingDays: FieldRef<"JetForCharter", 'String'>
    readonly noticeRequired: FieldRef<"JetForCharter", 'String'>
    readonly pricePerHour: FieldRef<"JetForCharter", 'String'>
    readonly minimumFlightTime: FieldRef<"JetForCharter", 'String'>
    readonly tripOption: FieldRef<"JetForCharter", 'TripOption'>
    readonly additionalFees: FieldRef<"JetForCharter", 'Json'>
    readonly discounts: FieldRef<"JetForCharter", 'String'>
    readonly cabinFeatures: FieldRef<"JetForCharter", 'String[]'>
    readonly inFlightMeals: FieldRef<"JetForCharter", 'Boolean'>
    readonly flightAttendant: FieldRef<"JetForCharter", 'Boolean'>
    readonly petsAllowed: FieldRef<"JetForCharter", 'Boolean'>
    readonly smokingAllowed: FieldRef<"JetForCharter", 'Boolean'>
    readonly exteriorImages: FieldRef<"JetForCharter", 'String[]'>
    readonly interiorImages: FieldRef<"JetForCharter", 'String[]'>
    readonly videoLink: FieldRef<"JetForCharter", 'String'>
    readonly luxuryCarService: FieldRef<"JetForCharter", 'Boolean'>
    readonly vendorId: FieldRef<"JetForCharter", 'String'>
    readonly sponsored: FieldRef<"JetForCharter", 'Boolean'>
    readonly sponsoredType: FieldRef<"JetForCharter", 'String'>
    readonly endData: FieldRef<"JetForCharter", 'DateTime'>
    readonly transactionSignature: FieldRef<"JetForCharter", 'String'>
    readonly transactionLink: FieldRef<"JetForCharter", 'String'>
    readonly status: FieldRef<"JetForCharter", 'String'>
    readonly views: FieldRef<"JetForCharter", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JetForCharter findUnique
   */
  export type JetForCharterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharter to fetch.
     */
    where: JetForCharterWhereUniqueInput
  }

  /**
   * JetForCharter findUniqueOrThrow
   */
  export type JetForCharterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharter to fetch.
     */
    where: JetForCharterWhereUniqueInput
  }

  /**
   * JetForCharter findFirst
   */
  export type JetForCharterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharter to fetch.
     */
    where?: JetForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharters to fetch.
     */
    orderBy?: JetForCharterOrderByWithRelationInput | JetForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForCharters.
     */
    cursor?: JetForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForCharters.
     */
    distinct?: JetForCharterScalarFieldEnum | JetForCharterScalarFieldEnum[]
  }

  /**
   * JetForCharter findFirstOrThrow
   */
  export type JetForCharterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharter to fetch.
     */
    where?: JetForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharters to fetch.
     */
    orderBy?: JetForCharterOrderByWithRelationInput | JetForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForCharters.
     */
    cursor?: JetForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForCharters.
     */
    distinct?: JetForCharterScalarFieldEnum | JetForCharterScalarFieldEnum[]
  }

  /**
   * JetForCharter findMany
   */
  export type JetForCharterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharters to fetch.
     */
    where?: JetForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharters to fetch.
     */
    orderBy?: JetForCharterOrderByWithRelationInput | JetForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JetForCharters.
     */
    cursor?: JetForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharters.
     */
    skip?: number
    distinct?: JetForCharterScalarFieldEnum | JetForCharterScalarFieldEnum[]
  }

  /**
   * JetForCharter create
   */
  export type JetForCharterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * The data needed to create a JetForCharter.
     */
    data: XOR<JetForCharterCreateInput, JetForCharterUncheckedCreateInput>
  }

  /**
   * JetForCharter createMany
   */
  export type JetForCharterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JetForCharters.
     */
    data: JetForCharterCreateManyInput | JetForCharterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForCharter createManyAndReturn
   */
  export type JetForCharterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * The data used to create many JetForCharters.
     */
    data: JetForCharterCreateManyInput | JetForCharterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForCharter update
   */
  export type JetForCharterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * The data needed to update a JetForCharter.
     */
    data: XOR<JetForCharterUpdateInput, JetForCharterUncheckedUpdateInput>
    /**
     * Choose, which JetForCharter to update.
     */
    where: JetForCharterWhereUniqueInput
  }

  /**
   * JetForCharter updateMany
   */
  export type JetForCharterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JetForCharters.
     */
    data: XOR<JetForCharterUpdateManyMutationInput, JetForCharterUncheckedUpdateManyInput>
    /**
     * Filter which JetForCharters to update
     */
    where?: JetForCharterWhereInput
    /**
     * Limit how many JetForCharters to update.
     */
    limit?: number
  }

  /**
   * JetForCharter updateManyAndReturn
   */
  export type JetForCharterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * The data used to update JetForCharters.
     */
    data: XOR<JetForCharterUpdateManyMutationInput, JetForCharterUncheckedUpdateManyInput>
    /**
     * Filter which JetForCharters to update
     */
    where?: JetForCharterWhereInput
    /**
     * Limit how many JetForCharters to update.
     */
    limit?: number
  }

  /**
   * JetForCharter upsert
   */
  export type JetForCharterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * The filter to search for the JetForCharter to update in case it exists.
     */
    where: JetForCharterWhereUniqueInput
    /**
     * In case the JetForCharter found by the `where` argument doesn't exist, create a new JetForCharter with this data.
     */
    create: XOR<JetForCharterCreateInput, JetForCharterUncheckedCreateInput>
    /**
     * In case the JetForCharter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JetForCharterUpdateInput, JetForCharterUncheckedUpdateInput>
  }

  /**
   * JetForCharter delete
   */
  export type JetForCharterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
    /**
     * Filter which JetForCharter to delete.
     */
    where: JetForCharterWhereUniqueInput
  }

  /**
   * JetForCharter deleteMany
   */
  export type JetForCharterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForCharters to delete
     */
    where?: JetForCharterWhereInput
    /**
     * Limit how many JetForCharters to delete.
     */
    limit?: number
  }

  /**
   * JetForCharter without action
   */
  export type JetForCharterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharter
     */
    select?: JetForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharter
     */
    omit?: JetForCharterOmit<ExtArgs> | null
  }


  /**
   * Model JetForSaleMessages
   */

  export type AggregateJetForSaleMessages = {
    _count: JetForSaleMessagesCountAggregateOutputType | null
    _min: JetForSaleMessagesMinAggregateOutputType | null
    _max: JetForSaleMessagesMaxAggregateOutputType | null
  }

  export type JetForSaleMessagesMinAggregateOutputType = {
    id: string | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    listingId: string | null
    vendorId: string | null
    message: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type JetForSaleMessagesMaxAggregateOutputType = {
    id: string | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    listingId: string | null
    vendorId: string | null
    message: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type JetForSaleMessagesCountAggregateOutputType = {
    id: number
    customerName: number
    customerEmail: number
    customerCountry: number
    listingId: number
    vendorId: number
    message: number
    createdAt: number
    read: number
    _all: number
  }


  export type JetForSaleMessagesMinAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    listingId?: true
    vendorId?: true
    message?: true
    createdAt?: true
    read?: true
  }

  export type JetForSaleMessagesMaxAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    listingId?: true
    vendorId?: true
    message?: true
    createdAt?: true
    read?: true
  }

  export type JetForSaleMessagesCountAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    listingId?: true
    vendorId?: true
    message?: true
    createdAt?: true
    read?: true
    _all?: true
  }

  export type JetForSaleMessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForSaleMessages to aggregate.
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForSaleMessages to fetch.
     */
    orderBy?: JetForSaleMessagesOrderByWithRelationInput | JetForSaleMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JetForSaleMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForSaleMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForSaleMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JetForSaleMessages
    **/
    _count?: true | JetForSaleMessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JetForSaleMessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JetForSaleMessagesMaxAggregateInputType
  }

  export type GetJetForSaleMessagesAggregateType<T extends JetForSaleMessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateJetForSaleMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJetForSaleMessages[P]>
      : GetScalarType<T[P], AggregateJetForSaleMessages[P]>
  }




  export type JetForSaleMessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JetForSaleMessagesWhereInput
    orderBy?: JetForSaleMessagesOrderByWithAggregationInput | JetForSaleMessagesOrderByWithAggregationInput[]
    by: JetForSaleMessagesScalarFieldEnum[] | JetForSaleMessagesScalarFieldEnum
    having?: JetForSaleMessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JetForSaleMessagesCountAggregateInputType | true
    _min?: JetForSaleMessagesMinAggregateInputType
    _max?: JetForSaleMessagesMaxAggregateInputType
  }

  export type JetForSaleMessagesGroupByOutputType = {
    id: string
    customerName: string
    customerEmail: string
    customerCountry: string
    listingId: string
    vendorId: string
    message: string
    createdAt: Date
    read: boolean
    _count: JetForSaleMessagesCountAggregateOutputType | null
    _min: JetForSaleMessagesMinAggregateOutputType | null
    _max: JetForSaleMessagesMaxAggregateOutputType | null
  }

  type GetJetForSaleMessagesGroupByPayload<T extends JetForSaleMessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JetForSaleMessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JetForSaleMessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JetForSaleMessagesGroupByOutputType[P]>
            : GetScalarType<T[P], JetForSaleMessagesGroupByOutputType[P]>
        }
      >
    >


  export type JetForSaleMessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["jetForSaleMessages"]>

  export type JetForSaleMessagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["jetForSaleMessages"]>

  export type JetForSaleMessagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["jetForSaleMessages"]>

  export type JetForSaleMessagesSelectScalar = {
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    createdAt?: boolean
    read?: boolean
  }

  export type JetForSaleMessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "customerEmail" | "customerCountry" | "listingId" | "vendorId" | "message" | "createdAt" | "read", ExtArgs["result"]["jetForSaleMessages"]>

  export type $JetForSaleMessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JetForSaleMessages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerName: string
      customerEmail: string
      customerCountry: string
      listingId: string
      vendorId: string
      message: string
      createdAt: Date
      read: boolean
    }, ExtArgs["result"]["jetForSaleMessages"]>
    composites: {}
  }

  type JetForSaleMessagesGetPayload<S extends boolean | null | undefined | JetForSaleMessagesDefaultArgs> = $Result.GetResult<Prisma.$JetForSaleMessagesPayload, S>

  type JetForSaleMessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JetForSaleMessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JetForSaleMessagesCountAggregateInputType | true
    }

  export interface JetForSaleMessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JetForSaleMessages'], meta: { name: 'JetForSaleMessages' } }
    /**
     * Find zero or one JetForSaleMessages that matches the filter.
     * @param {JetForSaleMessagesFindUniqueArgs} args - Arguments to find a JetForSaleMessages
     * @example
     * // Get one JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JetForSaleMessagesFindUniqueArgs>(args: SelectSubset<T, JetForSaleMessagesFindUniqueArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JetForSaleMessages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JetForSaleMessagesFindUniqueOrThrowArgs} args - Arguments to find a JetForSaleMessages
     * @example
     * // Get one JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JetForSaleMessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, JetForSaleMessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForSaleMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesFindFirstArgs} args - Arguments to find a JetForSaleMessages
     * @example
     * // Get one JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JetForSaleMessagesFindFirstArgs>(args?: SelectSubset<T, JetForSaleMessagesFindFirstArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForSaleMessages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesFindFirstOrThrowArgs} args - Arguments to find a JetForSaleMessages
     * @example
     * // Get one JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JetForSaleMessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, JetForSaleMessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JetForSaleMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.findMany()
     * 
     * // Get first 10 JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jetForSaleMessagesWithIdOnly = await prisma.jetForSaleMessages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JetForSaleMessagesFindManyArgs>(args?: SelectSubset<T, JetForSaleMessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JetForSaleMessages.
     * @param {JetForSaleMessagesCreateArgs} args - Arguments to create a JetForSaleMessages.
     * @example
     * // Create one JetForSaleMessages
     * const JetForSaleMessages = await prisma.jetForSaleMessages.create({
     *   data: {
     *     // ... data to create a JetForSaleMessages
     *   }
     * })
     * 
     */
    create<T extends JetForSaleMessagesCreateArgs>(args: SelectSubset<T, JetForSaleMessagesCreateArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JetForSaleMessages.
     * @param {JetForSaleMessagesCreateManyArgs} args - Arguments to create many JetForSaleMessages.
     * @example
     * // Create many JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JetForSaleMessagesCreateManyArgs>(args?: SelectSubset<T, JetForSaleMessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JetForSaleMessages and returns the data saved in the database.
     * @param {JetForSaleMessagesCreateManyAndReturnArgs} args - Arguments to create many JetForSaleMessages.
     * @example
     * // Create many JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JetForSaleMessages and only return the `id`
     * const jetForSaleMessagesWithIdOnly = await prisma.jetForSaleMessages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JetForSaleMessagesCreateManyAndReturnArgs>(args?: SelectSubset<T, JetForSaleMessagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JetForSaleMessages.
     * @param {JetForSaleMessagesDeleteArgs} args - Arguments to delete one JetForSaleMessages.
     * @example
     * // Delete one JetForSaleMessages
     * const JetForSaleMessages = await prisma.jetForSaleMessages.delete({
     *   where: {
     *     // ... filter to delete one JetForSaleMessages
     *   }
     * })
     * 
     */
    delete<T extends JetForSaleMessagesDeleteArgs>(args: SelectSubset<T, JetForSaleMessagesDeleteArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JetForSaleMessages.
     * @param {JetForSaleMessagesUpdateArgs} args - Arguments to update one JetForSaleMessages.
     * @example
     * // Update one JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JetForSaleMessagesUpdateArgs>(args: SelectSubset<T, JetForSaleMessagesUpdateArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JetForSaleMessages.
     * @param {JetForSaleMessagesDeleteManyArgs} args - Arguments to filter JetForSaleMessages to delete.
     * @example
     * // Delete a few JetForSaleMessages
     * const { count } = await prisma.jetForSaleMessages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JetForSaleMessagesDeleteManyArgs>(args?: SelectSubset<T, JetForSaleMessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForSaleMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JetForSaleMessagesUpdateManyArgs>(args: SelectSubset<T, JetForSaleMessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForSaleMessages and returns the data updated in the database.
     * @param {JetForSaleMessagesUpdateManyAndReturnArgs} args - Arguments to update many JetForSaleMessages.
     * @example
     * // Update many JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JetForSaleMessages and only return the `id`
     * const jetForSaleMessagesWithIdOnly = await prisma.jetForSaleMessages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JetForSaleMessagesUpdateManyAndReturnArgs>(args: SelectSubset<T, JetForSaleMessagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JetForSaleMessages.
     * @param {JetForSaleMessagesUpsertArgs} args - Arguments to update or create a JetForSaleMessages.
     * @example
     * // Update or create a JetForSaleMessages
     * const jetForSaleMessages = await prisma.jetForSaleMessages.upsert({
     *   create: {
     *     // ... data to create a JetForSaleMessages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JetForSaleMessages we want to update
     *   }
     * })
     */
    upsert<T extends JetForSaleMessagesUpsertArgs>(args: SelectSubset<T, JetForSaleMessagesUpsertArgs<ExtArgs>>): Prisma__JetForSaleMessagesClient<$Result.GetResult<Prisma.$JetForSaleMessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JetForSaleMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesCountArgs} args - Arguments to filter JetForSaleMessages to count.
     * @example
     * // Count the number of JetForSaleMessages
     * const count = await prisma.jetForSaleMessages.count({
     *   where: {
     *     // ... the filter for the JetForSaleMessages we want to count
     *   }
     * })
    **/
    count<T extends JetForSaleMessagesCountArgs>(
      args?: Subset<T, JetForSaleMessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JetForSaleMessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JetForSaleMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JetForSaleMessagesAggregateArgs>(args: Subset<T, JetForSaleMessagesAggregateArgs>): Prisma.PrismaPromise<GetJetForSaleMessagesAggregateType<T>>

    /**
     * Group by JetForSaleMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForSaleMessagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JetForSaleMessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JetForSaleMessagesGroupByArgs['orderBy'] }
        : { orderBy?: JetForSaleMessagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JetForSaleMessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJetForSaleMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JetForSaleMessages model
   */
  readonly fields: JetForSaleMessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JetForSaleMessages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JetForSaleMessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JetForSaleMessages model
   */
  interface JetForSaleMessagesFieldRefs {
    readonly id: FieldRef<"JetForSaleMessages", 'String'>
    readonly customerName: FieldRef<"JetForSaleMessages", 'String'>
    readonly customerEmail: FieldRef<"JetForSaleMessages", 'String'>
    readonly customerCountry: FieldRef<"JetForSaleMessages", 'String'>
    readonly listingId: FieldRef<"JetForSaleMessages", 'String'>
    readonly vendorId: FieldRef<"JetForSaleMessages", 'String'>
    readonly message: FieldRef<"JetForSaleMessages", 'String'>
    readonly createdAt: FieldRef<"JetForSaleMessages", 'DateTime'>
    readonly read: FieldRef<"JetForSaleMessages", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * JetForSaleMessages findUnique
   */
  export type JetForSaleMessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForSaleMessages to fetch.
     */
    where: JetForSaleMessagesWhereUniqueInput
  }

  /**
   * JetForSaleMessages findUniqueOrThrow
   */
  export type JetForSaleMessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForSaleMessages to fetch.
     */
    where: JetForSaleMessagesWhereUniqueInput
  }

  /**
   * JetForSaleMessages findFirst
   */
  export type JetForSaleMessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForSaleMessages to fetch.
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForSaleMessages to fetch.
     */
    orderBy?: JetForSaleMessagesOrderByWithRelationInput | JetForSaleMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForSaleMessages.
     */
    cursor?: JetForSaleMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForSaleMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForSaleMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForSaleMessages.
     */
    distinct?: JetForSaleMessagesScalarFieldEnum | JetForSaleMessagesScalarFieldEnum[]
  }

  /**
   * JetForSaleMessages findFirstOrThrow
   */
  export type JetForSaleMessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForSaleMessages to fetch.
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForSaleMessages to fetch.
     */
    orderBy?: JetForSaleMessagesOrderByWithRelationInput | JetForSaleMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForSaleMessages.
     */
    cursor?: JetForSaleMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForSaleMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForSaleMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForSaleMessages.
     */
    distinct?: JetForSaleMessagesScalarFieldEnum | JetForSaleMessagesScalarFieldEnum[]
  }

  /**
   * JetForSaleMessages findMany
   */
  export type JetForSaleMessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForSaleMessages to fetch.
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForSaleMessages to fetch.
     */
    orderBy?: JetForSaleMessagesOrderByWithRelationInput | JetForSaleMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JetForSaleMessages.
     */
    cursor?: JetForSaleMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForSaleMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForSaleMessages.
     */
    skip?: number
    distinct?: JetForSaleMessagesScalarFieldEnum | JetForSaleMessagesScalarFieldEnum[]
  }

  /**
   * JetForSaleMessages create
   */
  export type JetForSaleMessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * The data needed to create a JetForSaleMessages.
     */
    data: XOR<JetForSaleMessagesCreateInput, JetForSaleMessagesUncheckedCreateInput>
  }

  /**
   * JetForSaleMessages createMany
   */
  export type JetForSaleMessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JetForSaleMessages.
     */
    data: JetForSaleMessagesCreateManyInput | JetForSaleMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForSaleMessages createManyAndReturn
   */
  export type JetForSaleMessagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * The data used to create many JetForSaleMessages.
     */
    data: JetForSaleMessagesCreateManyInput | JetForSaleMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForSaleMessages update
   */
  export type JetForSaleMessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * The data needed to update a JetForSaleMessages.
     */
    data: XOR<JetForSaleMessagesUpdateInput, JetForSaleMessagesUncheckedUpdateInput>
    /**
     * Choose, which JetForSaleMessages to update.
     */
    where: JetForSaleMessagesWhereUniqueInput
  }

  /**
   * JetForSaleMessages updateMany
   */
  export type JetForSaleMessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JetForSaleMessages.
     */
    data: XOR<JetForSaleMessagesUpdateManyMutationInput, JetForSaleMessagesUncheckedUpdateManyInput>
    /**
     * Filter which JetForSaleMessages to update
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * Limit how many JetForSaleMessages to update.
     */
    limit?: number
  }

  /**
   * JetForSaleMessages updateManyAndReturn
   */
  export type JetForSaleMessagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * The data used to update JetForSaleMessages.
     */
    data: XOR<JetForSaleMessagesUpdateManyMutationInput, JetForSaleMessagesUncheckedUpdateManyInput>
    /**
     * Filter which JetForSaleMessages to update
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * Limit how many JetForSaleMessages to update.
     */
    limit?: number
  }

  /**
   * JetForSaleMessages upsert
   */
  export type JetForSaleMessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * The filter to search for the JetForSaleMessages to update in case it exists.
     */
    where: JetForSaleMessagesWhereUniqueInput
    /**
     * In case the JetForSaleMessages found by the `where` argument doesn't exist, create a new JetForSaleMessages with this data.
     */
    create: XOR<JetForSaleMessagesCreateInput, JetForSaleMessagesUncheckedCreateInput>
    /**
     * In case the JetForSaleMessages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JetForSaleMessagesUpdateInput, JetForSaleMessagesUncheckedUpdateInput>
  }

  /**
   * JetForSaleMessages delete
   */
  export type JetForSaleMessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
    /**
     * Filter which JetForSaleMessages to delete.
     */
    where: JetForSaleMessagesWhereUniqueInput
  }

  /**
   * JetForSaleMessages deleteMany
   */
  export type JetForSaleMessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForSaleMessages to delete
     */
    where?: JetForSaleMessagesWhereInput
    /**
     * Limit how many JetForSaleMessages to delete.
     */
    limit?: number
  }

  /**
   * JetForSaleMessages without action
   */
  export type JetForSaleMessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForSaleMessages
     */
    select?: JetForSaleMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForSaleMessages
     */
    omit?: JetForSaleMessagesOmit<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    wallet: string | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    wallet: string | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    wallet: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    wallet?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    wallet?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    wallet?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    wallet: string
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wallet?: boolean
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wallet?: boolean
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    wallet?: boolean
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    wallet?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "wallet", ExtArgs["result"]["wallet"]>

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      wallet: string
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly wallet: FieldRef<"Wallet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    publicKey: 'publicKey',
    admin: 'admin',
    status: 'status',
    vendor: 'vendor'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VendorScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    email: 'email',
    name: 'name',
    companyName: 'companyName',
    country: 'country',
    phone: 'phone',
    serviceType: 'serviceType',
    status: 'status',
    website: 'website',
    description: 'description',
    document: 'document',
    password: 'password',
    brandImage: 'brandImage',
    walletAddress: 'walletAddress'
  };

  export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    email: 'email',
    password: 'password',
    name: 'name'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const JetScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    manufacturer: 'manufacturer',
    otherManufacturer: 'otherManufacturer',
    model: 'model',
    year: 'year',
    serialNumber: 'serialNumber',
    totalTimeSinceNew: 'totalTimeSinceNew',
    totalLandings: 'totalLandings',
    engineMakeModel: 'engineMakeModel',
    engineHours: 'engineHours',
    avionicsSuite: 'avionicsSuite',
    interiorConfig: 'interiorConfig',
    interiorImageUrls: 'interiorImageUrls',
    exteriorImageUrls: 'exteriorImageUrls',
    price: 'price',
    currentLocation: 'currentLocation',
    registrationNumber: 'registrationNumber',
    contactDetails: 'contactDetails',
    aircraftType: 'aircraftType',
    seatingCapacity: 'seatingCapacity',
    cabinHeight: 'cabinHeight',
    cabinWidth: 'cabinWidth',
    cabinLength: 'cabinLength',
    baggageCapacity: 'baggageCapacity',
    numberOfEngines: 'numberOfEngines',
    engineType: 'engineType',
    engineThrust: 'engineThrust',
    certification: 'certification',
    noiseCompliance: 'noiseCompliance',
    lastInspectionDate: 'lastInspectionDate',
    nextInspectionDue: 'nextInspectionDue',
    maintenanceStatus: 'maintenanceStatus',
    previousOwners: 'previousOwners',
    maintenanceProgram: 'maintenanceProgram',
    airframeEngineStatus: 'airframeEngineStatus',
    refurbishmentDate: 'refurbishmentDate',
    wifiConnectivity: 'wifiConnectivity',
    lavatoryGalleyDetails: 'lavatoryGalleyDetails',
    cabinAmenities: 'cabinAmenities',
    range: 'range',
    cruiseSpeed: 'cruiseSpeed',
    maxAltitude: 'maxAltitude',
    runwayLength: 'runwayLength',
    emptyWeight: 'emptyWeight',
    maxTakeoffWeight: 'maxTakeoffWeight',
    deliveryAvailability: 'deliveryAvailability',
    paymentTxSignature: 'paymentTxSignature',
    transactionLink: 'transactionLink',
    vendorId: 'vendorId',
    views: 'views',
    status: 'status',
    sponsored: 'sponsored',
    sponsoredType: 'sponsoredType',
    end_date: 'end_date'
  };

  export type JetScalarFieldEnum = (typeof JetScalarFieldEnum)[keyof typeof JetScalarFieldEnum]


  export const JetForBidsScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    manufacturer: 'manufacturer',
    otherManufacturer: 'otherManufacturer',
    model: 'model',
    year: 'year',
    serialNumber: 'serialNumber',
    totalTimeSinceNew: 'totalTimeSinceNew',
    totalLandings: 'totalLandings',
    engineMakeModel: 'engineMakeModel',
    engineHours: 'engineHours',
    avionicsSuite: 'avionicsSuite',
    interiorConfig: 'interiorConfig',
    interiorImageUrls: 'interiorImageUrls',
    exteriorImageUrls: 'exteriorImageUrls',
    price: 'price',
    currentLocation: 'currentLocation',
    registrationNumber: 'registrationNumber',
    contactDetails: 'contactDetails',
    previousOwners: 'previousOwners',
    maintenanceProgram: 'maintenanceProgram',
    airframeEngineStatus: 'airframeEngineStatus',
    refurbishmentDate: 'refurbishmentDate',
    wifiConnectivity: 'wifiConnectivity',
    lavatoryGalleyDetails: 'lavatoryGalleyDetails',
    cabinAmenities: 'cabinAmenities',
    range: 'range',
    cruiseSpeed: 'cruiseSpeed',
    maxAltitude: 'maxAltitude',
    runwayLength: 'runwayLength',
    emptyWeight: 'emptyWeight',
    maxTakeoffWeight: 'maxTakeoffWeight',
    deliveryAvailability: 'deliveryAvailability',
    vendorId: 'vendorId',
    views: 'views',
    status: 'status',
    sponsored: 'sponsored',
    sponsoredType: 'sponsoredType',
    end_date: 'end_date',
    biddingEndDate: 'biddingEndDate',
    minimumBidIncrement: 'minimumBidIncrement',
    biddingStatus: 'biddingStatus',
    currentBid: 'currentBid',
    bidCount: 'bidCount'
  };

  export type JetForBidsScalarFieldEnum = (typeof JetForBidsScalarFieldEnum)[keyof typeof JetForBidsScalarFieldEnum]


  export const JetForCharterScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    jetName: 'jetName',
    aircraftType: 'aircraftType',
    manufacturer: 'manufacturer',
    yearOfManufacture: 'yearOfManufacture',
    registrationNumber: 'registrationNumber',
    seatingCapacity: 'seatingCapacity',
    cabinConfiguration: 'cabinConfiguration',
    maximumRange: 'maximumRange',
    cruisingSpeed: 'cruisingSpeed',
    baggageCapacity: 'baggageCapacity',
    homeBase: 'homeBase',
    availableRoutes: 'availableRoutes',
    operatingDays: 'operatingDays',
    noticeRequired: 'noticeRequired',
    pricePerHour: 'pricePerHour',
    minimumFlightTime: 'minimumFlightTime',
    tripOption: 'tripOption',
    additionalFees: 'additionalFees',
    discounts: 'discounts',
    cabinFeatures: 'cabinFeatures',
    inFlightMeals: 'inFlightMeals',
    flightAttendant: 'flightAttendant',
    petsAllowed: 'petsAllowed',
    smokingAllowed: 'smokingAllowed',
    exteriorImages: 'exteriorImages',
    interiorImages: 'interiorImages',
    videoLink: 'videoLink',
    luxuryCarService: 'luxuryCarService',
    vendorId: 'vendorId',
    sponsored: 'sponsored',
    sponsoredType: 'sponsoredType',
    endData: 'endData',
    transactionSignature: 'transactionSignature',
    transactionLink: 'transactionLink',
    status: 'status',
    views: 'views'
  };

  export type JetForCharterScalarFieldEnum = (typeof JetForCharterScalarFieldEnum)[keyof typeof JetForCharterScalarFieldEnum]


  export const JetForSaleMessagesScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerCountry: 'customerCountry',
    listingId: 'listingId',
    vendorId: 'vendorId',
    message: 'message',
    createdAt: 'createdAt',
    read: 'read'
  };

  export type JetForSaleMessagesScalarFieldEnum = (typeof JetForSaleMessagesScalarFieldEnum)[keyof typeof JetForSaleMessagesScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    wallet: 'wallet'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'TripOption'
   */
  export type EnumTripOptionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripOption'>
    


  /**
   * Reference to a field of type 'TripOption[]'
   */
  export type ListEnumTripOptionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TripOption[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    publicKey?: StringFilter<"User"> | string
    admin?: BoolFilter<"User"> | boolean
    status?: StringFilter<"User"> | string
    vendor?: BoolFilter<"User"> | boolean
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    publicKey?: SortOrder
    admin?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    publicKey?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    admin?: BoolFilter<"User"> | boolean
    status?: StringFilter<"User"> | string
    vendor?: BoolFilter<"User"> | boolean
  }, "id" | "publicKey">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    publicKey?: SortOrder
    admin?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    publicKey?: StringWithAggregatesFilter<"User"> | string
    admin?: BoolWithAggregatesFilter<"User"> | boolean
    status?: StringWithAggregatesFilter<"User"> | string
    vendor?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type VendorWhereInput = {
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    id?: StringFilter<"Vendor"> | string
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    email?: StringFilter<"Vendor"> | string
    name?: StringFilter<"Vendor"> | string
    companyName?: StringFilter<"Vendor"> | string
    country?: StringNullableFilter<"Vendor"> | string | null
    phone?: StringFilter<"Vendor"> | string
    serviceType?: StringFilter<"Vendor"> | string
    status?: StringFilter<"Vendor"> | string
    website?: StringNullableFilter<"Vendor"> | string | null
    description?: StringNullableFilter<"Vendor"> | string | null
    document?: StringNullableFilter<"Vendor"> | string | null
    password?: StringNullableFilter<"Vendor"> | string | null
    brandImage?: StringFilter<"Vendor"> | string
    walletAddress?: StringNullableFilter<"Vendor"> | string | null
  }

  export type VendorOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    companyName?: SortOrder
    country?: SortOrderInput | SortOrder
    phone?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    document?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    brandImage?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
  }

  export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    name?: StringFilter<"Vendor"> | string
    companyName?: StringFilter<"Vendor"> | string
    country?: StringNullableFilter<"Vendor"> | string | null
    phone?: StringFilter<"Vendor"> | string
    serviceType?: StringFilter<"Vendor"> | string
    status?: StringFilter<"Vendor"> | string
    website?: StringNullableFilter<"Vendor"> | string | null
    description?: StringNullableFilter<"Vendor"> | string | null
    document?: StringNullableFilter<"Vendor"> | string | null
    password?: StringNullableFilter<"Vendor"> | string | null
    brandImage?: StringFilter<"Vendor"> | string
    walletAddress?: StringNullableFilter<"Vendor"> | string | null
  }, "id" | "email">

  export type VendorOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    companyName?: SortOrder
    country?: SortOrderInput | SortOrder
    phone?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    document?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    brandImage?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    _count?: VendorCountOrderByAggregateInput
    _max?: VendorMaxOrderByAggregateInput
    _min?: VendorMinOrderByAggregateInput
  }

  export type VendorScalarWhereWithAggregatesInput = {
    AND?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    OR?: VendorScalarWhereWithAggregatesInput[]
    NOT?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vendor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
    email?: StringWithAggregatesFilter<"Vendor"> | string
    name?: StringWithAggregatesFilter<"Vendor"> | string
    companyName?: StringWithAggregatesFilter<"Vendor"> | string
    country?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    phone?: StringWithAggregatesFilter<"Vendor"> | string
    serviceType?: StringWithAggregatesFilter<"Vendor"> | string
    status?: StringWithAggregatesFilter<"Vendor"> | string
    website?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    description?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    document?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    password?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    brandImage?: StringWithAggregatesFilter<"Vendor"> | string
    walletAddress?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    password?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type JetWhereInput = {
    AND?: JetWhereInput | JetWhereInput[]
    OR?: JetWhereInput[]
    NOT?: JetWhereInput | JetWhereInput[]
    id?: StringFilter<"Jet"> | string
    createdAt?: DateTimeFilter<"Jet"> | Date | string
    manufacturer?: StringFilter<"Jet"> | string
    otherManufacturer?: StringNullableFilter<"Jet"> | string | null
    model?: StringFilter<"Jet"> | string
    year?: IntFilter<"Jet"> | number
    serialNumber?: StringFilter<"Jet"> | string
    totalTimeSinceNew?: IntFilter<"Jet"> | number
    totalLandings?: IntFilter<"Jet"> | number
    engineMakeModel?: StringFilter<"Jet"> | string
    engineHours?: IntFilter<"Jet"> | number
    avionicsSuite?: StringFilter<"Jet"> | string
    interiorConfig?: StringFilter<"Jet"> | string
    interiorImageUrls?: StringNullableListFilter<"Jet">
    exteriorImageUrls?: StringNullableListFilter<"Jet">
    price?: StringFilter<"Jet"> | string
    currentLocation?: StringFilter<"Jet"> | string
    registrationNumber?: StringFilter<"Jet"> | string
    contactDetails?: StringFilter<"Jet"> | string
    aircraftType?: StringFilter<"Jet"> | string
    seatingCapacity?: IntFilter<"Jet"> | number
    cabinHeight?: FloatFilter<"Jet"> | number
    cabinWidth?: FloatFilter<"Jet"> | number
    cabinLength?: FloatFilter<"Jet"> | number
    baggageCapacity?: FloatFilter<"Jet"> | number
    numberOfEngines?: IntFilter<"Jet"> | number
    engineType?: StringFilter<"Jet"> | string
    engineThrust?: FloatFilter<"Jet"> | number
    certification?: StringFilter<"Jet"> | string
    noiseCompliance?: StringFilter<"Jet"> | string
    lastInspectionDate?: DateTimeFilter<"Jet"> | Date | string
    nextInspectionDue?: DateTimeFilter<"Jet"> | Date | string
    maintenanceStatus?: StringFilter<"Jet"> | string
    previousOwners?: IntNullableFilter<"Jet"> | number | null
    maintenanceProgram?: StringNullableFilter<"Jet"> | string | null
    airframeEngineStatus?: StringNullableFilter<"Jet"> | string | null
    refurbishmentDate?: StringNullableFilter<"Jet"> | string | null
    wifiConnectivity?: StringNullableFilter<"Jet"> | string | null
    lavatoryGalleyDetails?: StringNullableFilter<"Jet"> | string | null
    cabinAmenities?: StringNullableFilter<"Jet"> | string | null
    range?: FloatNullableFilter<"Jet"> | number | null
    cruiseSpeed?: FloatNullableFilter<"Jet"> | number | null
    maxAltitude?: FloatNullableFilter<"Jet"> | number | null
    runwayLength?: FloatNullableFilter<"Jet"> | number | null
    emptyWeight?: FloatNullableFilter<"Jet"> | number | null
    maxTakeoffWeight?: FloatNullableFilter<"Jet"> | number | null
    deliveryAvailability?: StringNullableFilter<"Jet"> | string | null
    paymentTxSignature?: StringFilter<"Jet"> | string
    transactionLink?: StringNullableFilter<"Jet"> | string | null
    vendorId?: StringFilter<"Jet"> | string
    views?: IntFilter<"Jet"> | number
    status?: StringFilter<"Jet"> | string
    sponsored?: BoolFilter<"Jet"> | boolean
    sponsoredType?: StringFilter<"Jet"> | string
    end_date?: DateTimeFilter<"Jet"> | Date | string
  }

  export type JetOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrderInput | SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    interiorImageUrls?: SortOrder
    exteriorImageUrls?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    aircraftType?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineType?: SortOrder
    engineThrust?: SortOrder
    certification?: SortOrder
    noiseCompliance?: SortOrder
    lastInspectionDate?: SortOrder
    nextInspectionDue?: SortOrder
    maintenanceStatus?: SortOrder
    previousOwners?: SortOrderInput | SortOrder
    maintenanceProgram?: SortOrderInput | SortOrder
    airframeEngineStatus?: SortOrderInput | SortOrder
    refurbishmentDate?: SortOrderInput | SortOrder
    wifiConnectivity?: SortOrderInput | SortOrder
    lavatoryGalleyDetails?: SortOrderInput | SortOrder
    cabinAmenities?: SortOrderInput | SortOrder
    range?: SortOrderInput | SortOrder
    cruiseSpeed?: SortOrderInput | SortOrder
    maxAltitude?: SortOrderInput | SortOrder
    runwayLength?: SortOrderInput | SortOrder
    emptyWeight?: SortOrderInput | SortOrder
    maxTakeoffWeight?: SortOrderInput | SortOrder
    deliveryAvailability?: SortOrderInput | SortOrder
    paymentTxSignature?: SortOrder
    transactionLink?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
  }

  export type JetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registrationNumber?: string
    AND?: JetWhereInput | JetWhereInput[]
    OR?: JetWhereInput[]
    NOT?: JetWhereInput | JetWhereInput[]
    createdAt?: DateTimeFilter<"Jet"> | Date | string
    manufacturer?: StringFilter<"Jet"> | string
    otherManufacturer?: StringNullableFilter<"Jet"> | string | null
    model?: StringFilter<"Jet"> | string
    year?: IntFilter<"Jet"> | number
    serialNumber?: StringFilter<"Jet"> | string
    totalTimeSinceNew?: IntFilter<"Jet"> | number
    totalLandings?: IntFilter<"Jet"> | number
    engineMakeModel?: StringFilter<"Jet"> | string
    engineHours?: IntFilter<"Jet"> | number
    avionicsSuite?: StringFilter<"Jet"> | string
    interiorConfig?: StringFilter<"Jet"> | string
    interiorImageUrls?: StringNullableListFilter<"Jet">
    exteriorImageUrls?: StringNullableListFilter<"Jet">
    price?: StringFilter<"Jet"> | string
    currentLocation?: StringFilter<"Jet"> | string
    contactDetails?: StringFilter<"Jet"> | string
    aircraftType?: StringFilter<"Jet"> | string
    seatingCapacity?: IntFilter<"Jet"> | number
    cabinHeight?: FloatFilter<"Jet"> | number
    cabinWidth?: FloatFilter<"Jet"> | number
    cabinLength?: FloatFilter<"Jet"> | number
    baggageCapacity?: FloatFilter<"Jet"> | number
    numberOfEngines?: IntFilter<"Jet"> | number
    engineType?: StringFilter<"Jet"> | string
    engineThrust?: FloatFilter<"Jet"> | number
    certification?: StringFilter<"Jet"> | string
    noiseCompliance?: StringFilter<"Jet"> | string
    lastInspectionDate?: DateTimeFilter<"Jet"> | Date | string
    nextInspectionDue?: DateTimeFilter<"Jet"> | Date | string
    maintenanceStatus?: StringFilter<"Jet"> | string
    previousOwners?: IntNullableFilter<"Jet"> | number | null
    maintenanceProgram?: StringNullableFilter<"Jet"> | string | null
    airframeEngineStatus?: StringNullableFilter<"Jet"> | string | null
    refurbishmentDate?: StringNullableFilter<"Jet"> | string | null
    wifiConnectivity?: StringNullableFilter<"Jet"> | string | null
    lavatoryGalleyDetails?: StringNullableFilter<"Jet"> | string | null
    cabinAmenities?: StringNullableFilter<"Jet"> | string | null
    range?: FloatNullableFilter<"Jet"> | number | null
    cruiseSpeed?: FloatNullableFilter<"Jet"> | number | null
    maxAltitude?: FloatNullableFilter<"Jet"> | number | null
    runwayLength?: FloatNullableFilter<"Jet"> | number | null
    emptyWeight?: FloatNullableFilter<"Jet"> | number | null
    maxTakeoffWeight?: FloatNullableFilter<"Jet"> | number | null
    deliveryAvailability?: StringNullableFilter<"Jet"> | string | null
    paymentTxSignature?: StringFilter<"Jet"> | string
    transactionLink?: StringNullableFilter<"Jet"> | string | null
    vendorId?: StringFilter<"Jet"> | string
    views?: IntFilter<"Jet"> | number
    status?: StringFilter<"Jet"> | string
    sponsored?: BoolFilter<"Jet"> | boolean
    sponsoredType?: StringFilter<"Jet"> | string
    end_date?: DateTimeFilter<"Jet"> | Date | string
  }, "id" | "registrationNumber">

  export type JetOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrderInput | SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    interiorImageUrls?: SortOrder
    exteriorImageUrls?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    aircraftType?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineType?: SortOrder
    engineThrust?: SortOrder
    certification?: SortOrder
    noiseCompliance?: SortOrder
    lastInspectionDate?: SortOrder
    nextInspectionDue?: SortOrder
    maintenanceStatus?: SortOrder
    previousOwners?: SortOrderInput | SortOrder
    maintenanceProgram?: SortOrderInput | SortOrder
    airframeEngineStatus?: SortOrderInput | SortOrder
    refurbishmentDate?: SortOrderInput | SortOrder
    wifiConnectivity?: SortOrderInput | SortOrder
    lavatoryGalleyDetails?: SortOrderInput | SortOrder
    cabinAmenities?: SortOrderInput | SortOrder
    range?: SortOrderInput | SortOrder
    cruiseSpeed?: SortOrderInput | SortOrder
    maxAltitude?: SortOrderInput | SortOrder
    runwayLength?: SortOrderInput | SortOrder
    emptyWeight?: SortOrderInput | SortOrder
    maxTakeoffWeight?: SortOrderInput | SortOrder
    deliveryAvailability?: SortOrderInput | SortOrder
    paymentTxSignature?: SortOrder
    transactionLink?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
    _count?: JetCountOrderByAggregateInput
    _avg?: JetAvgOrderByAggregateInput
    _max?: JetMaxOrderByAggregateInput
    _min?: JetMinOrderByAggregateInput
    _sum?: JetSumOrderByAggregateInput
  }

  export type JetScalarWhereWithAggregatesInput = {
    AND?: JetScalarWhereWithAggregatesInput | JetScalarWhereWithAggregatesInput[]
    OR?: JetScalarWhereWithAggregatesInput[]
    NOT?: JetScalarWhereWithAggregatesInput | JetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Jet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Jet"> | Date | string
    manufacturer?: StringWithAggregatesFilter<"Jet"> | string
    otherManufacturer?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    model?: StringWithAggregatesFilter<"Jet"> | string
    year?: IntWithAggregatesFilter<"Jet"> | number
    serialNumber?: StringWithAggregatesFilter<"Jet"> | string
    totalTimeSinceNew?: IntWithAggregatesFilter<"Jet"> | number
    totalLandings?: IntWithAggregatesFilter<"Jet"> | number
    engineMakeModel?: StringWithAggregatesFilter<"Jet"> | string
    engineHours?: IntWithAggregatesFilter<"Jet"> | number
    avionicsSuite?: StringWithAggregatesFilter<"Jet"> | string
    interiorConfig?: StringWithAggregatesFilter<"Jet"> | string
    interiorImageUrls?: StringNullableListFilter<"Jet">
    exteriorImageUrls?: StringNullableListFilter<"Jet">
    price?: StringWithAggregatesFilter<"Jet"> | string
    currentLocation?: StringWithAggregatesFilter<"Jet"> | string
    registrationNumber?: StringWithAggregatesFilter<"Jet"> | string
    contactDetails?: StringWithAggregatesFilter<"Jet"> | string
    aircraftType?: StringWithAggregatesFilter<"Jet"> | string
    seatingCapacity?: IntWithAggregatesFilter<"Jet"> | number
    cabinHeight?: FloatWithAggregatesFilter<"Jet"> | number
    cabinWidth?: FloatWithAggregatesFilter<"Jet"> | number
    cabinLength?: FloatWithAggregatesFilter<"Jet"> | number
    baggageCapacity?: FloatWithAggregatesFilter<"Jet"> | number
    numberOfEngines?: IntWithAggregatesFilter<"Jet"> | number
    engineType?: StringWithAggregatesFilter<"Jet"> | string
    engineThrust?: FloatWithAggregatesFilter<"Jet"> | number
    certification?: StringWithAggregatesFilter<"Jet"> | string
    noiseCompliance?: StringWithAggregatesFilter<"Jet"> | string
    lastInspectionDate?: DateTimeWithAggregatesFilter<"Jet"> | Date | string
    nextInspectionDue?: DateTimeWithAggregatesFilter<"Jet"> | Date | string
    maintenanceStatus?: StringWithAggregatesFilter<"Jet"> | string
    previousOwners?: IntNullableWithAggregatesFilter<"Jet"> | number | null
    maintenanceProgram?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    airframeEngineStatus?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    refurbishmentDate?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    wifiConnectivity?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    lavatoryGalleyDetails?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    cabinAmenities?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    range?: FloatNullableWithAggregatesFilter<"Jet"> | number | null
    cruiseSpeed?: FloatNullableWithAggregatesFilter<"Jet"> | number | null
    maxAltitude?: FloatNullableWithAggregatesFilter<"Jet"> | number | null
    runwayLength?: FloatNullableWithAggregatesFilter<"Jet"> | number | null
    emptyWeight?: FloatNullableWithAggregatesFilter<"Jet"> | number | null
    maxTakeoffWeight?: FloatNullableWithAggregatesFilter<"Jet"> | number | null
    deliveryAvailability?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    paymentTxSignature?: StringWithAggregatesFilter<"Jet"> | string
    transactionLink?: StringNullableWithAggregatesFilter<"Jet"> | string | null
    vendorId?: StringWithAggregatesFilter<"Jet"> | string
    views?: IntWithAggregatesFilter<"Jet"> | number
    status?: StringWithAggregatesFilter<"Jet"> | string
    sponsored?: BoolWithAggregatesFilter<"Jet"> | boolean
    sponsoredType?: StringWithAggregatesFilter<"Jet"> | string
    end_date?: DateTimeWithAggregatesFilter<"Jet"> | Date | string
  }

  export type JetForBidsWhereInput = {
    AND?: JetForBidsWhereInput | JetForBidsWhereInput[]
    OR?: JetForBidsWhereInput[]
    NOT?: JetForBidsWhereInput | JetForBidsWhereInput[]
    id?: StringFilter<"JetForBids"> | string
    createdAt?: DateTimeFilter<"JetForBids"> | Date | string
    manufacturer?: StringFilter<"JetForBids"> | string
    otherManufacturer?: StringNullableFilter<"JetForBids"> | string | null
    model?: StringFilter<"JetForBids"> | string
    year?: IntFilter<"JetForBids"> | number
    serialNumber?: StringFilter<"JetForBids"> | string
    totalTimeSinceNew?: IntFilter<"JetForBids"> | number
    totalLandings?: IntFilter<"JetForBids"> | number
    engineMakeModel?: StringFilter<"JetForBids"> | string
    engineHours?: IntFilter<"JetForBids"> | number
    avionicsSuite?: StringFilter<"JetForBids"> | string
    interiorConfig?: StringFilter<"JetForBids"> | string
    interiorImageUrls?: StringNullableListFilter<"JetForBids">
    exteriorImageUrls?: StringNullableListFilter<"JetForBids">
    price?: StringFilter<"JetForBids"> | string
    currentLocation?: StringFilter<"JetForBids"> | string
    registrationNumber?: StringFilter<"JetForBids"> | string
    contactDetails?: StringFilter<"JetForBids"> | string
    previousOwners?: IntNullableFilter<"JetForBids"> | number | null
    maintenanceProgram?: StringNullableFilter<"JetForBids"> | string | null
    airframeEngineStatus?: StringNullableFilter<"JetForBids"> | string | null
    refurbishmentDate?: StringNullableFilter<"JetForBids"> | string | null
    wifiConnectivity?: StringNullableFilter<"JetForBids"> | string | null
    lavatoryGalleyDetails?: StringNullableFilter<"JetForBids"> | string | null
    cabinAmenities?: StringNullableFilter<"JetForBids"> | string | null
    range?: FloatNullableFilter<"JetForBids"> | number | null
    cruiseSpeed?: FloatNullableFilter<"JetForBids"> | number | null
    maxAltitude?: FloatNullableFilter<"JetForBids"> | number | null
    runwayLength?: FloatNullableFilter<"JetForBids"> | number | null
    emptyWeight?: FloatNullableFilter<"JetForBids"> | number | null
    maxTakeoffWeight?: FloatNullableFilter<"JetForBids"> | number | null
    deliveryAvailability?: StringNullableFilter<"JetForBids"> | string | null
    vendorId?: StringFilter<"JetForBids"> | string
    views?: IntFilter<"JetForBids"> | number
    status?: StringFilter<"JetForBids"> | string
    sponsored?: BoolFilter<"JetForBids"> | boolean
    sponsoredType?: StringFilter<"JetForBids"> | string
    end_date?: DateTimeFilter<"JetForBids"> | Date | string
    biddingEndDate?: DateTimeFilter<"JetForBids"> | Date | string
    minimumBidIncrement?: FloatFilter<"JetForBids"> | number
    biddingStatus?: StringFilter<"JetForBids"> | string
    currentBid?: FloatNullableFilter<"JetForBids"> | number | null
    bidCount?: IntFilter<"JetForBids"> | number
  }

  export type JetForBidsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrderInput | SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    interiorImageUrls?: SortOrder
    exteriorImageUrls?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    previousOwners?: SortOrderInput | SortOrder
    maintenanceProgram?: SortOrderInput | SortOrder
    airframeEngineStatus?: SortOrderInput | SortOrder
    refurbishmentDate?: SortOrderInput | SortOrder
    wifiConnectivity?: SortOrderInput | SortOrder
    lavatoryGalleyDetails?: SortOrderInput | SortOrder
    cabinAmenities?: SortOrderInput | SortOrder
    range?: SortOrderInput | SortOrder
    cruiseSpeed?: SortOrderInput | SortOrder
    maxAltitude?: SortOrderInput | SortOrder
    runwayLength?: SortOrderInput | SortOrder
    emptyWeight?: SortOrderInput | SortOrder
    maxTakeoffWeight?: SortOrderInput | SortOrder
    deliveryAvailability?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
    biddingEndDate?: SortOrder
    minimumBidIncrement?: SortOrder
    biddingStatus?: SortOrder
    currentBid?: SortOrderInput | SortOrder
    bidCount?: SortOrder
  }

  export type JetForBidsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registrationNumber?: string
    AND?: JetForBidsWhereInput | JetForBidsWhereInput[]
    OR?: JetForBidsWhereInput[]
    NOT?: JetForBidsWhereInput | JetForBidsWhereInput[]
    createdAt?: DateTimeFilter<"JetForBids"> | Date | string
    manufacturer?: StringFilter<"JetForBids"> | string
    otherManufacturer?: StringNullableFilter<"JetForBids"> | string | null
    model?: StringFilter<"JetForBids"> | string
    year?: IntFilter<"JetForBids"> | number
    serialNumber?: StringFilter<"JetForBids"> | string
    totalTimeSinceNew?: IntFilter<"JetForBids"> | number
    totalLandings?: IntFilter<"JetForBids"> | number
    engineMakeModel?: StringFilter<"JetForBids"> | string
    engineHours?: IntFilter<"JetForBids"> | number
    avionicsSuite?: StringFilter<"JetForBids"> | string
    interiorConfig?: StringFilter<"JetForBids"> | string
    interiorImageUrls?: StringNullableListFilter<"JetForBids">
    exteriorImageUrls?: StringNullableListFilter<"JetForBids">
    price?: StringFilter<"JetForBids"> | string
    currentLocation?: StringFilter<"JetForBids"> | string
    contactDetails?: StringFilter<"JetForBids"> | string
    previousOwners?: IntNullableFilter<"JetForBids"> | number | null
    maintenanceProgram?: StringNullableFilter<"JetForBids"> | string | null
    airframeEngineStatus?: StringNullableFilter<"JetForBids"> | string | null
    refurbishmentDate?: StringNullableFilter<"JetForBids"> | string | null
    wifiConnectivity?: StringNullableFilter<"JetForBids"> | string | null
    lavatoryGalleyDetails?: StringNullableFilter<"JetForBids"> | string | null
    cabinAmenities?: StringNullableFilter<"JetForBids"> | string | null
    range?: FloatNullableFilter<"JetForBids"> | number | null
    cruiseSpeed?: FloatNullableFilter<"JetForBids"> | number | null
    maxAltitude?: FloatNullableFilter<"JetForBids"> | number | null
    runwayLength?: FloatNullableFilter<"JetForBids"> | number | null
    emptyWeight?: FloatNullableFilter<"JetForBids"> | number | null
    maxTakeoffWeight?: FloatNullableFilter<"JetForBids"> | number | null
    deliveryAvailability?: StringNullableFilter<"JetForBids"> | string | null
    vendorId?: StringFilter<"JetForBids"> | string
    views?: IntFilter<"JetForBids"> | number
    status?: StringFilter<"JetForBids"> | string
    sponsored?: BoolFilter<"JetForBids"> | boolean
    sponsoredType?: StringFilter<"JetForBids"> | string
    end_date?: DateTimeFilter<"JetForBids"> | Date | string
    biddingEndDate?: DateTimeFilter<"JetForBids"> | Date | string
    minimumBidIncrement?: FloatFilter<"JetForBids"> | number
    biddingStatus?: StringFilter<"JetForBids"> | string
    currentBid?: FloatNullableFilter<"JetForBids"> | number | null
    bidCount?: IntFilter<"JetForBids"> | number
  }, "id" | "registrationNumber">

  export type JetForBidsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrderInput | SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    interiorImageUrls?: SortOrder
    exteriorImageUrls?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    previousOwners?: SortOrderInput | SortOrder
    maintenanceProgram?: SortOrderInput | SortOrder
    airframeEngineStatus?: SortOrderInput | SortOrder
    refurbishmentDate?: SortOrderInput | SortOrder
    wifiConnectivity?: SortOrderInput | SortOrder
    lavatoryGalleyDetails?: SortOrderInput | SortOrder
    cabinAmenities?: SortOrderInput | SortOrder
    range?: SortOrderInput | SortOrder
    cruiseSpeed?: SortOrderInput | SortOrder
    maxAltitude?: SortOrderInput | SortOrder
    runwayLength?: SortOrderInput | SortOrder
    emptyWeight?: SortOrderInput | SortOrder
    maxTakeoffWeight?: SortOrderInput | SortOrder
    deliveryAvailability?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
    biddingEndDate?: SortOrder
    minimumBidIncrement?: SortOrder
    biddingStatus?: SortOrder
    currentBid?: SortOrderInput | SortOrder
    bidCount?: SortOrder
    _count?: JetForBidsCountOrderByAggregateInput
    _avg?: JetForBidsAvgOrderByAggregateInput
    _max?: JetForBidsMaxOrderByAggregateInput
    _min?: JetForBidsMinOrderByAggregateInput
    _sum?: JetForBidsSumOrderByAggregateInput
  }

  export type JetForBidsScalarWhereWithAggregatesInput = {
    AND?: JetForBidsScalarWhereWithAggregatesInput | JetForBidsScalarWhereWithAggregatesInput[]
    OR?: JetForBidsScalarWhereWithAggregatesInput[]
    NOT?: JetForBidsScalarWhereWithAggregatesInput | JetForBidsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JetForBids"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JetForBids"> | Date | string
    manufacturer?: StringWithAggregatesFilter<"JetForBids"> | string
    otherManufacturer?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    model?: StringWithAggregatesFilter<"JetForBids"> | string
    year?: IntWithAggregatesFilter<"JetForBids"> | number
    serialNumber?: StringWithAggregatesFilter<"JetForBids"> | string
    totalTimeSinceNew?: IntWithAggregatesFilter<"JetForBids"> | number
    totalLandings?: IntWithAggregatesFilter<"JetForBids"> | number
    engineMakeModel?: StringWithAggregatesFilter<"JetForBids"> | string
    engineHours?: IntWithAggregatesFilter<"JetForBids"> | number
    avionicsSuite?: StringWithAggregatesFilter<"JetForBids"> | string
    interiorConfig?: StringWithAggregatesFilter<"JetForBids"> | string
    interiorImageUrls?: StringNullableListFilter<"JetForBids">
    exteriorImageUrls?: StringNullableListFilter<"JetForBids">
    price?: StringWithAggregatesFilter<"JetForBids"> | string
    currentLocation?: StringWithAggregatesFilter<"JetForBids"> | string
    registrationNumber?: StringWithAggregatesFilter<"JetForBids"> | string
    contactDetails?: StringWithAggregatesFilter<"JetForBids"> | string
    previousOwners?: IntNullableWithAggregatesFilter<"JetForBids"> | number | null
    maintenanceProgram?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    airframeEngineStatus?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    refurbishmentDate?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    wifiConnectivity?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    lavatoryGalleyDetails?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    cabinAmenities?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    range?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    cruiseSpeed?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    maxAltitude?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    runwayLength?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    emptyWeight?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    maxTakeoffWeight?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    deliveryAvailability?: StringNullableWithAggregatesFilter<"JetForBids"> | string | null
    vendorId?: StringWithAggregatesFilter<"JetForBids"> | string
    views?: IntWithAggregatesFilter<"JetForBids"> | number
    status?: StringWithAggregatesFilter<"JetForBids"> | string
    sponsored?: BoolWithAggregatesFilter<"JetForBids"> | boolean
    sponsoredType?: StringWithAggregatesFilter<"JetForBids"> | string
    end_date?: DateTimeWithAggregatesFilter<"JetForBids"> | Date | string
    biddingEndDate?: DateTimeWithAggregatesFilter<"JetForBids"> | Date | string
    minimumBidIncrement?: FloatWithAggregatesFilter<"JetForBids"> | number
    biddingStatus?: StringWithAggregatesFilter<"JetForBids"> | string
    currentBid?: FloatNullableWithAggregatesFilter<"JetForBids"> | number | null
    bidCount?: IntWithAggregatesFilter<"JetForBids"> | number
  }

  export type JetForCharterWhereInput = {
    AND?: JetForCharterWhereInput | JetForCharterWhereInput[]
    OR?: JetForCharterWhereInput[]
    NOT?: JetForCharterWhereInput | JetForCharterWhereInput[]
    id?: StringFilter<"JetForCharter"> | string
    createdAt?: DateTimeFilter<"JetForCharter"> | Date | string
    updatedAt?: DateTimeFilter<"JetForCharter"> | Date | string
    jetName?: StringFilter<"JetForCharter"> | string
    aircraftType?: StringFilter<"JetForCharter"> | string
    manufacturer?: StringFilter<"JetForCharter"> | string
    yearOfManufacture?: StringFilter<"JetForCharter"> | string
    registrationNumber?: StringFilter<"JetForCharter"> | string
    seatingCapacity?: StringFilter<"JetForCharter"> | string
    cabinConfiguration?: StringFilter<"JetForCharter"> | string
    maximumRange?: StringFilter<"JetForCharter"> | string
    cruisingSpeed?: StringFilter<"JetForCharter"> | string
    baggageCapacity?: StringFilter<"JetForCharter"> | string
    homeBase?: StringFilter<"JetForCharter"> | string
    availableRoutes?: StringFilter<"JetForCharter"> | string
    operatingDays?: StringFilter<"JetForCharter"> | string
    noticeRequired?: StringFilter<"JetForCharter"> | string
    pricePerHour?: StringFilter<"JetForCharter"> | string
    minimumFlightTime?: StringFilter<"JetForCharter"> | string
    tripOption?: EnumTripOptionFilter<"JetForCharter"> | $Enums.TripOption
    additionalFees?: JsonFilter<"JetForCharter">
    discounts?: StringNullableFilter<"JetForCharter"> | string | null
    cabinFeatures?: StringNullableListFilter<"JetForCharter">
    inFlightMeals?: BoolFilter<"JetForCharter"> | boolean
    flightAttendant?: BoolFilter<"JetForCharter"> | boolean
    petsAllowed?: BoolFilter<"JetForCharter"> | boolean
    smokingAllowed?: BoolFilter<"JetForCharter"> | boolean
    exteriorImages?: StringNullableListFilter<"JetForCharter">
    interiorImages?: StringNullableListFilter<"JetForCharter">
    videoLink?: StringNullableFilter<"JetForCharter"> | string | null
    luxuryCarService?: BoolFilter<"JetForCharter"> | boolean
    vendorId?: StringFilter<"JetForCharter"> | string
    sponsored?: BoolFilter<"JetForCharter"> | boolean
    sponsoredType?: StringFilter<"JetForCharter"> | string
    endData?: DateTimeFilter<"JetForCharter"> | Date | string
    transactionSignature?: StringFilter<"JetForCharter"> | string
    transactionLink?: StringFilter<"JetForCharter"> | string
    status?: StringFilter<"JetForCharter"> | string
    views?: IntFilter<"JetForCharter"> | number
  }

  export type JetForCharterOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jetName?: SortOrder
    aircraftType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    seatingCapacity?: SortOrder
    cabinConfiguration?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    homeBase?: SortOrder
    availableRoutes?: SortOrder
    operatingDays?: SortOrder
    noticeRequired?: SortOrder
    pricePerHour?: SortOrder
    minimumFlightTime?: SortOrder
    tripOption?: SortOrder
    additionalFees?: SortOrder
    discounts?: SortOrderInput | SortOrder
    cabinFeatures?: SortOrder
    inFlightMeals?: SortOrder
    flightAttendant?: SortOrder
    petsAllowed?: SortOrder
    smokingAllowed?: SortOrder
    exteriorImages?: SortOrder
    interiorImages?: SortOrder
    videoLink?: SortOrderInput | SortOrder
    luxuryCarService?: SortOrder
    vendorId?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endData?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    status?: SortOrder
    views?: SortOrder
  }

  export type JetForCharterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JetForCharterWhereInput | JetForCharterWhereInput[]
    OR?: JetForCharterWhereInput[]
    NOT?: JetForCharterWhereInput | JetForCharterWhereInput[]
    createdAt?: DateTimeFilter<"JetForCharter"> | Date | string
    updatedAt?: DateTimeFilter<"JetForCharter"> | Date | string
    jetName?: StringFilter<"JetForCharter"> | string
    aircraftType?: StringFilter<"JetForCharter"> | string
    manufacturer?: StringFilter<"JetForCharter"> | string
    yearOfManufacture?: StringFilter<"JetForCharter"> | string
    registrationNumber?: StringFilter<"JetForCharter"> | string
    seatingCapacity?: StringFilter<"JetForCharter"> | string
    cabinConfiguration?: StringFilter<"JetForCharter"> | string
    maximumRange?: StringFilter<"JetForCharter"> | string
    cruisingSpeed?: StringFilter<"JetForCharter"> | string
    baggageCapacity?: StringFilter<"JetForCharter"> | string
    homeBase?: StringFilter<"JetForCharter"> | string
    availableRoutes?: StringFilter<"JetForCharter"> | string
    operatingDays?: StringFilter<"JetForCharter"> | string
    noticeRequired?: StringFilter<"JetForCharter"> | string
    pricePerHour?: StringFilter<"JetForCharter"> | string
    minimumFlightTime?: StringFilter<"JetForCharter"> | string
    tripOption?: EnumTripOptionFilter<"JetForCharter"> | $Enums.TripOption
    additionalFees?: JsonFilter<"JetForCharter">
    discounts?: StringNullableFilter<"JetForCharter"> | string | null
    cabinFeatures?: StringNullableListFilter<"JetForCharter">
    inFlightMeals?: BoolFilter<"JetForCharter"> | boolean
    flightAttendant?: BoolFilter<"JetForCharter"> | boolean
    petsAllowed?: BoolFilter<"JetForCharter"> | boolean
    smokingAllowed?: BoolFilter<"JetForCharter"> | boolean
    exteriorImages?: StringNullableListFilter<"JetForCharter">
    interiorImages?: StringNullableListFilter<"JetForCharter">
    videoLink?: StringNullableFilter<"JetForCharter"> | string | null
    luxuryCarService?: BoolFilter<"JetForCharter"> | boolean
    vendorId?: StringFilter<"JetForCharter"> | string
    sponsored?: BoolFilter<"JetForCharter"> | boolean
    sponsoredType?: StringFilter<"JetForCharter"> | string
    endData?: DateTimeFilter<"JetForCharter"> | Date | string
    transactionSignature?: StringFilter<"JetForCharter"> | string
    transactionLink?: StringFilter<"JetForCharter"> | string
    status?: StringFilter<"JetForCharter"> | string
    views?: IntFilter<"JetForCharter"> | number
  }, "id">

  export type JetForCharterOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jetName?: SortOrder
    aircraftType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    seatingCapacity?: SortOrder
    cabinConfiguration?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    homeBase?: SortOrder
    availableRoutes?: SortOrder
    operatingDays?: SortOrder
    noticeRequired?: SortOrder
    pricePerHour?: SortOrder
    minimumFlightTime?: SortOrder
    tripOption?: SortOrder
    additionalFees?: SortOrder
    discounts?: SortOrderInput | SortOrder
    cabinFeatures?: SortOrder
    inFlightMeals?: SortOrder
    flightAttendant?: SortOrder
    petsAllowed?: SortOrder
    smokingAllowed?: SortOrder
    exteriorImages?: SortOrder
    interiorImages?: SortOrder
    videoLink?: SortOrderInput | SortOrder
    luxuryCarService?: SortOrder
    vendorId?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endData?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    status?: SortOrder
    views?: SortOrder
    _count?: JetForCharterCountOrderByAggregateInput
    _avg?: JetForCharterAvgOrderByAggregateInput
    _max?: JetForCharterMaxOrderByAggregateInput
    _min?: JetForCharterMinOrderByAggregateInput
    _sum?: JetForCharterSumOrderByAggregateInput
  }

  export type JetForCharterScalarWhereWithAggregatesInput = {
    AND?: JetForCharterScalarWhereWithAggregatesInput | JetForCharterScalarWhereWithAggregatesInput[]
    OR?: JetForCharterScalarWhereWithAggregatesInput[]
    NOT?: JetForCharterScalarWhereWithAggregatesInput | JetForCharterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JetForCharter"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JetForCharter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JetForCharter"> | Date | string
    jetName?: StringWithAggregatesFilter<"JetForCharter"> | string
    aircraftType?: StringWithAggregatesFilter<"JetForCharter"> | string
    manufacturer?: StringWithAggregatesFilter<"JetForCharter"> | string
    yearOfManufacture?: StringWithAggregatesFilter<"JetForCharter"> | string
    registrationNumber?: StringWithAggregatesFilter<"JetForCharter"> | string
    seatingCapacity?: StringWithAggregatesFilter<"JetForCharter"> | string
    cabinConfiguration?: StringWithAggregatesFilter<"JetForCharter"> | string
    maximumRange?: StringWithAggregatesFilter<"JetForCharter"> | string
    cruisingSpeed?: StringWithAggregatesFilter<"JetForCharter"> | string
    baggageCapacity?: StringWithAggregatesFilter<"JetForCharter"> | string
    homeBase?: StringWithAggregatesFilter<"JetForCharter"> | string
    availableRoutes?: StringWithAggregatesFilter<"JetForCharter"> | string
    operatingDays?: StringWithAggregatesFilter<"JetForCharter"> | string
    noticeRequired?: StringWithAggregatesFilter<"JetForCharter"> | string
    pricePerHour?: StringWithAggregatesFilter<"JetForCharter"> | string
    minimumFlightTime?: StringWithAggregatesFilter<"JetForCharter"> | string
    tripOption?: EnumTripOptionWithAggregatesFilter<"JetForCharter"> | $Enums.TripOption
    additionalFees?: JsonWithAggregatesFilter<"JetForCharter">
    discounts?: StringNullableWithAggregatesFilter<"JetForCharter"> | string | null
    cabinFeatures?: StringNullableListFilter<"JetForCharter">
    inFlightMeals?: BoolWithAggregatesFilter<"JetForCharter"> | boolean
    flightAttendant?: BoolWithAggregatesFilter<"JetForCharter"> | boolean
    petsAllowed?: BoolWithAggregatesFilter<"JetForCharter"> | boolean
    smokingAllowed?: BoolWithAggregatesFilter<"JetForCharter"> | boolean
    exteriorImages?: StringNullableListFilter<"JetForCharter">
    interiorImages?: StringNullableListFilter<"JetForCharter">
    videoLink?: StringNullableWithAggregatesFilter<"JetForCharter"> | string | null
    luxuryCarService?: BoolWithAggregatesFilter<"JetForCharter"> | boolean
    vendorId?: StringWithAggregatesFilter<"JetForCharter"> | string
    sponsored?: BoolWithAggregatesFilter<"JetForCharter"> | boolean
    sponsoredType?: StringWithAggregatesFilter<"JetForCharter"> | string
    endData?: DateTimeWithAggregatesFilter<"JetForCharter"> | Date | string
    transactionSignature?: StringWithAggregatesFilter<"JetForCharter"> | string
    transactionLink?: StringWithAggregatesFilter<"JetForCharter"> | string
    status?: StringWithAggregatesFilter<"JetForCharter"> | string
    views?: IntWithAggregatesFilter<"JetForCharter"> | number
  }

  export type JetForSaleMessagesWhereInput = {
    AND?: JetForSaleMessagesWhereInput | JetForSaleMessagesWhereInput[]
    OR?: JetForSaleMessagesWhereInput[]
    NOT?: JetForSaleMessagesWhereInput | JetForSaleMessagesWhereInput[]
    id?: StringFilter<"JetForSaleMessages"> | string
    customerName?: StringFilter<"JetForSaleMessages"> | string
    customerEmail?: StringFilter<"JetForSaleMessages"> | string
    customerCountry?: StringFilter<"JetForSaleMessages"> | string
    listingId?: StringFilter<"JetForSaleMessages"> | string
    vendorId?: StringFilter<"JetForSaleMessages"> | string
    message?: StringFilter<"JetForSaleMessages"> | string
    createdAt?: DateTimeFilter<"JetForSaleMessages"> | Date | string
    read?: BoolFilter<"JetForSaleMessages"> | boolean
  }

  export type JetForSaleMessagesOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForSaleMessagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JetForSaleMessagesWhereInput | JetForSaleMessagesWhereInput[]
    OR?: JetForSaleMessagesWhereInput[]
    NOT?: JetForSaleMessagesWhereInput | JetForSaleMessagesWhereInput[]
    customerName?: StringFilter<"JetForSaleMessages"> | string
    customerEmail?: StringFilter<"JetForSaleMessages"> | string
    customerCountry?: StringFilter<"JetForSaleMessages"> | string
    listingId?: StringFilter<"JetForSaleMessages"> | string
    vendorId?: StringFilter<"JetForSaleMessages"> | string
    message?: StringFilter<"JetForSaleMessages"> | string
    createdAt?: DateTimeFilter<"JetForSaleMessages"> | Date | string
    read?: BoolFilter<"JetForSaleMessages"> | boolean
  }, "id">

  export type JetForSaleMessagesOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    _count?: JetForSaleMessagesCountOrderByAggregateInput
    _max?: JetForSaleMessagesMaxOrderByAggregateInput
    _min?: JetForSaleMessagesMinOrderByAggregateInput
  }

  export type JetForSaleMessagesScalarWhereWithAggregatesInput = {
    AND?: JetForSaleMessagesScalarWhereWithAggregatesInput | JetForSaleMessagesScalarWhereWithAggregatesInput[]
    OR?: JetForSaleMessagesScalarWhereWithAggregatesInput[]
    NOT?: JetForSaleMessagesScalarWhereWithAggregatesInput | JetForSaleMessagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    customerName?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    customerEmail?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    customerCountry?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    listingId?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    vendorId?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    message?: StringWithAggregatesFilter<"JetForSaleMessages"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JetForSaleMessages"> | Date | string
    read?: BoolWithAggregatesFilter<"JetForSaleMessages"> | boolean
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    wallet?: StringFilter<"Wallet"> | string
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    wallet?: SortOrder
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    wallet?: StringFilter<"Wallet"> | string
  }, "id">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    wallet?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    wallet?: StringWithAggregatesFilter<"Wallet"> | string
  }

  export type UserCreateInput = {
    id?: string
    publicKey: string
    admin?: boolean
    status: string
    vendor?: boolean
  }

  export type UserUncheckedCreateInput = {
    id?: string
    publicKey: string
    admin?: boolean
    status: string
    vendor?: boolean
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    admin?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    vendor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    admin?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    vendor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateManyInput = {
    id?: string
    publicKey: string
    admin?: boolean
    status: string
    vendor?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    admin?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    vendor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    admin?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    vendor?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VendorCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    companyName: string
    country?: string | null
    phone: string
    serviceType: string
    status?: string
    website?: string | null
    description?: string | null
    document?: string | null
    password?: string | null
    brandImage?: string
    walletAddress?: string | null
  }

  export type VendorUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    companyName: string
    country?: string | null
    phone: string
    serviceType: string
    status?: string
    website?: string | null
    description?: string | null
    document?: string | null
    password?: string | null
    brandImage?: string
    walletAddress?: string | null
  }

  export type VendorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    brandImage?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    brandImage?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendorCreateManyInput = {
    id?: string
    createdAt?: Date | string
    email: string
    name: string
    companyName: string
    country?: string | null
    phone: string
    serviceType: string
    status?: string
    website?: string | null
    description?: string | null
    document?: string | null
    password?: string | null
    brandImage?: string
    walletAddress?: string | null
  }

  export type VendorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    brandImage?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VendorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    serviceType?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    document?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    brandImage?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    password: string
    name: string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    email: string
    password: string
    name: string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateManyInput = {
    id?: string
    createdAt?: Date | string
    email: string
    password: string
    name: string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type JetCreateInput = {
    id?: string
    createdAt?: Date | string
    manufacturer: string
    otherManufacturer?: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls?: JetCreateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetCreateexteriorImageUrlsInput | string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    aircraftType: string
    seatingCapacity: number
    cabinHeight: number
    cabinWidth: number
    cabinLength: number
    baggageCapacity: number
    numberOfEngines: number
    engineType: string
    engineThrust: number
    certification?: string
    noiseCompliance: string
    lastInspectionDate: Date | string
    nextInspectionDue: Date | string
    maintenanceStatus: string
    previousOwners?: number | null
    maintenanceProgram?: string | null
    airframeEngineStatus?: string | null
    refurbishmentDate?: string | null
    wifiConnectivity?: string | null
    lavatoryGalleyDetails?: string | null
    cabinAmenities?: string | null
    range?: number | null
    cruiseSpeed?: number | null
    maxAltitude?: number | null
    runwayLength?: number | null
    emptyWeight?: number | null
    maxTakeoffWeight?: number | null
    deliveryAvailability?: string | null
    paymentTxSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    end_date?: Date | string
  }

  export type JetUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    manufacturer: string
    otherManufacturer?: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls?: JetCreateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetCreateexteriorImageUrlsInput | string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    aircraftType: string
    seatingCapacity: number
    cabinHeight: number
    cabinWidth: number
    cabinLength: number
    baggageCapacity: number
    numberOfEngines: number
    engineType: string
    engineThrust: number
    certification?: string
    noiseCompliance: string
    lastInspectionDate: Date | string
    nextInspectionDue: Date | string
    maintenanceStatus: string
    previousOwners?: number | null
    maintenanceProgram?: string | null
    airframeEngineStatus?: string | null
    refurbishmentDate?: string | null
    wifiConnectivity?: string | null
    lavatoryGalleyDetails?: string | null
    cabinAmenities?: string | null
    range?: number | null
    cruiseSpeed?: number | null
    maxAltitude?: number | null
    runwayLength?: number | null
    emptyWeight?: number | null
    maxTakeoffWeight?: number | null
    deliveryAvailability?: string | null
    paymentTxSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    end_date?: Date | string
  }

  export type JetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    cabinHeight?: FloatFieldUpdateOperationsInput | number
    cabinWidth?: FloatFieldUpdateOperationsInput | number
    cabinLength?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: FloatFieldUpdateOperationsInput | number
    numberOfEngines?: IntFieldUpdateOperationsInput | number
    engineType?: StringFieldUpdateOperationsInput | string
    engineThrust?: FloatFieldUpdateOperationsInput | number
    certification?: StringFieldUpdateOperationsInput | string
    noiseCompliance?: StringFieldUpdateOperationsInput | string
    lastInspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextInspectionDue?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceStatus?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    cabinHeight?: FloatFieldUpdateOperationsInput | number
    cabinWidth?: FloatFieldUpdateOperationsInput | number
    cabinLength?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: FloatFieldUpdateOperationsInput | number
    numberOfEngines?: IntFieldUpdateOperationsInput | number
    engineType?: StringFieldUpdateOperationsInput | string
    engineThrust?: FloatFieldUpdateOperationsInput | number
    certification?: StringFieldUpdateOperationsInput | string
    noiseCompliance?: StringFieldUpdateOperationsInput | string
    lastInspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextInspectionDue?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceStatus?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JetCreateManyInput = {
    id?: string
    createdAt?: Date | string
    manufacturer: string
    otherManufacturer?: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls?: JetCreateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetCreateexteriorImageUrlsInput | string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    aircraftType: string
    seatingCapacity: number
    cabinHeight: number
    cabinWidth: number
    cabinLength: number
    baggageCapacity: number
    numberOfEngines: number
    engineType: string
    engineThrust: number
    certification?: string
    noiseCompliance: string
    lastInspectionDate: Date | string
    nextInspectionDue: Date | string
    maintenanceStatus: string
    previousOwners?: number | null
    maintenanceProgram?: string | null
    airframeEngineStatus?: string | null
    refurbishmentDate?: string | null
    wifiConnectivity?: string | null
    lavatoryGalleyDetails?: string | null
    cabinAmenities?: string | null
    range?: number | null
    cruiseSpeed?: number | null
    maxAltitude?: number | null
    runwayLength?: number | null
    emptyWeight?: number | null
    maxTakeoffWeight?: number | null
    deliveryAvailability?: string | null
    paymentTxSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    end_date?: Date | string
  }

  export type JetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    cabinHeight?: FloatFieldUpdateOperationsInput | number
    cabinWidth?: FloatFieldUpdateOperationsInput | number
    cabinLength?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: FloatFieldUpdateOperationsInput | number
    numberOfEngines?: IntFieldUpdateOperationsInput | number
    engineType?: StringFieldUpdateOperationsInput | string
    engineThrust?: FloatFieldUpdateOperationsInput | number
    certification?: StringFieldUpdateOperationsInput | string
    noiseCompliance?: StringFieldUpdateOperationsInput | string
    lastInspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextInspectionDue?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceStatus?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    cabinHeight?: FloatFieldUpdateOperationsInput | number
    cabinWidth?: FloatFieldUpdateOperationsInput | number
    cabinLength?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: FloatFieldUpdateOperationsInput | number
    numberOfEngines?: IntFieldUpdateOperationsInput | number
    engineType?: StringFieldUpdateOperationsInput | string
    engineThrust?: FloatFieldUpdateOperationsInput | number
    certification?: StringFieldUpdateOperationsInput | string
    noiseCompliance?: StringFieldUpdateOperationsInput | string
    lastInspectionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextInspectionDue?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenanceStatus?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JetForBidsCreateInput = {
    id?: string
    createdAt?: Date | string
    manufacturer: string
    otherManufacturer?: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls?: JetForBidsCreateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsCreateexteriorImageUrlsInput | string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    previousOwners?: number | null
    maintenanceProgram?: string | null
    airframeEngineStatus?: string | null
    refurbishmentDate?: string | null
    wifiConnectivity?: string | null
    lavatoryGalleyDetails?: string | null
    cabinAmenities?: string | null
    range?: number | null
    cruiseSpeed?: number | null
    maxAltitude?: number | null
    runwayLength?: number | null
    emptyWeight?: number | null
    maxTakeoffWeight?: number | null
    deliveryAvailability?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    end_date?: Date | string
    biddingEndDate: Date | string
    minimumBidIncrement: number
    biddingStatus?: string
    currentBid?: number | null
    bidCount?: number
  }

  export type JetForBidsUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    manufacturer: string
    otherManufacturer?: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls?: JetForBidsCreateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsCreateexteriorImageUrlsInput | string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    previousOwners?: number | null
    maintenanceProgram?: string | null
    airframeEngineStatus?: string | null
    refurbishmentDate?: string | null
    wifiConnectivity?: string | null
    lavatoryGalleyDetails?: string | null
    cabinAmenities?: string | null
    range?: number | null
    cruiseSpeed?: number | null
    maxAltitude?: number | null
    runwayLength?: number | null
    emptyWeight?: number | null
    maxTakeoffWeight?: number | null
    deliveryAvailability?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    end_date?: Date | string
    biddingEndDate: Date | string
    minimumBidIncrement: number
    biddingStatus?: string
    currentBid?: number | null
    bidCount?: number
  }

  export type JetForBidsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetForBidsUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    biddingEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    minimumBidIncrement?: FloatFieldUpdateOperationsInput | number
    biddingStatus?: StringFieldUpdateOperationsInput | string
    currentBid?: NullableFloatFieldUpdateOperationsInput | number | null
    bidCount?: IntFieldUpdateOperationsInput | number
  }

  export type JetForBidsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetForBidsUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    biddingEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    minimumBidIncrement?: FloatFieldUpdateOperationsInput | number
    biddingStatus?: StringFieldUpdateOperationsInput | string
    currentBid?: NullableFloatFieldUpdateOperationsInput | number | null
    bidCount?: IntFieldUpdateOperationsInput | number
  }

  export type JetForBidsCreateManyInput = {
    id?: string
    createdAt?: Date | string
    manufacturer: string
    otherManufacturer?: string | null
    model: string
    year: number
    serialNumber: string
    totalTimeSinceNew: number
    totalLandings: number
    engineMakeModel: string
    engineHours: number
    avionicsSuite: string
    interiorConfig: string
    interiorImageUrls?: JetForBidsCreateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsCreateexteriorImageUrlsInput | string[]
    price: string
    currentLocation: string
    registrationNumber: string
    contactDetails: string
    previousOwners?: number | null
    maintenanceProgram?: string | null
    airframeEngineStatus?: string | null
    refurbishmentDate?: string | null
    wifiConnectivity?: string | null
    lavatoryGalleyDetails?: string | null
    cabinAmenities?: string | null
    range?: number | null
    cruiseSpeed?: number | null
    maxAltitude?: number | null
    runwayLength?: number | null
    emptyWeight?: number | null
    maxTakeoffWeight?: number | null
    deliveryAvailability?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    end_date?: Date | string
    biddingEndDate: Date | string
    minimumBidIncrement: number
    biddingStatus?: string
    currentBid?: number | null
    bidCount?: number
  }

  export type JetForBidsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetForBidsUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    biddingEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    minimumBidIncrement?: FloatFieldUpdateOperationsInput | number
    biddingStatus?: StringFieldUpdateOperationsInput | string
    currentBid?: NullableFloatFieldUpdateOperationsInput | number | null
    bidCount?: IntFieldUpdateOperationsInput | number
  }

  export type JetForBidsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    otherManufacturer?: NullableStringFieldUpdateOperationsInput | string | null
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    serialNumber?: StringFieldUpdateOperationsInput | string
    totalTimeSinceNew?: IntFieldUpdateOperationsInput | number
    totalLandings?: IntFieldUpdateOperationsInput | number
    engineMakeModel?: StringFieldUpdateOperationsInput | string
    engineHours?: IntFieldUpdateOperationsInput | number
    avionicsSuite?: StringFieldUpdateOperationsInput | string
    interiorConfig?: StringFieldUpdateOperationsInput | string
    interiorImageUrls?: JetForBidsUpdateinteriorImageUrlsInput | string[]
    exteriorImageUrls?: JetForBidsUpdateexteriorImageUrlsInput | string[]
    price?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    contactDetails?: StringFieldUpdateOperationsInput | string
    previousOwners?: NullableIntFieldUpdateOperationsInput | number | null
    maintenanceProgram?: NullableStringFieldUpdateOperationsInput | string | null
    airframeEngineStatus?: NullableStringFieldUpdateOperationsInput | string | null
    refurbishmentDate?: NullableStringFieldUpdateOperationsInput | string | null
    wifiConnectivity?: NullableStringFieldUpdateOperationsInput | string | null
    lavatoryGalleyDetails?: NullableStringFieldUpdateOperationsInput | string | null
    cabinAmenities?: NullableStringFieldUpdateOperationsInput | string | null
    range?: NullableFloatFieldUpdateOperationsInput | number | null
    cruiseSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
    maxAltitude?: NullableFloatFieldUpdateOperationsInput | number | null
    runwayLength?: NullableFloatFieldUpdateOperationsInput | number | null
    emptyWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    maxTakeoffWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryAvailability?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    biddingEndDate?: DateTimeFieldUpdateOperationsInput | Date | string
    minimumBidIncrement?: FloatFieldUpdateOperationsInput | number
    biddingStatus?: StringFieldUpdateOperationsInput | string
    currentBid?: NullableFloatFieldUpdateOperationsInput | number | null
    bidCount?: IntFieldUpdateOperationsInput | number
  }

  export type JetForCharterCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    jetName: string
    aircraftType: string
    manufacturer: string
    yearOfManufacture: string
    registrationNumber: string
    seatingCapacity: string
    cabinConfiguration: string
    maximumRange: string
    cruisingSpeed: string
    baggageCapacity: string
    homeBase: string
    availableRoutes: string
    operatingDays: string
    noticeRequired: string
    pricePerHour: string
    minimumFlightTime: string
    tripOption: $Enums.TripOption
    additionalFees: JsonNullValueInput | InputJsonValue
    discounts?: string | null
    cabinFeatures?: JetForCharterCreatecabinFeaturesInput | string[]
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: JetForCharterCreateexteriorImagesInput | string[]
    interiorImages?: JetForCharterCreateinteriorImagesInput | string[]
    videoLink?: string | null
    luxuryCarService?: boolean
    vendorId: string
    sponsored?: boolean
    sponsoredType?: string
    endData?: Date | string
    transactionSignature?: string
    transactionLink?: string
    status?: string
    views?: number
  }

  export type JetForCharterUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    jetName: string
    aircraftType: string
    manufacturer: string
    yearOfManufacture: string
    registrationNumber: string
    seatingCapacity: string
    cabinConfiguration: string
    maximumRange: string
    cruisingSpeed: string
    baggageCapacity: string
    homeBase: string
    availableRoutes: string
    operatingDays: string
    noticeRequired: string
    pricePerHour: string
    minimumFlightTime: string
    tripOption: $Enums.TripOption
    additionalFees: JsonNullValueInput | InputJsonValue
    discounts?: string | null
    cabinFeatures?: JetForCharterCreatecabinFeaturesInput | string[]
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: JetForCharterCreateexteriorImagesInput | string[]
    interiorImages?: JetForCharterCreateinteriorImagesInput | string[]
    videoLink?: string | null
    luxuryCarService?: boolean
    vendorId: string
    sponsored?: boolean
    sponsoredType?: string
    endData?: Date | string
    transactionSignature?: string
    transactionLink?: string
    status?: string
    views?: number
  }

  export type JetForCharterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jetName?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: StringFieldUpdateOperationsInput | string
    cabinConfiguration?: StringFieldUpdateOperationsInput | string
    maximumRange?: StringFieldUpdateOperationsInput | string
    cruisingSpeed?: StringFieldUpdateOperationsInput | string
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    homeBase?: StringFieldUpdateOperationsInput | string
    availableRoutes?: StringFieldUpdateOperationsInput | string
    operatingDays?: StringFieldUpdateOperationsInput | string
    noticeRequired?: StringFieldUpdateOperationsInput | string
    pricePerHour?: StringFieldUpdateOperationsInput | string
    minimumFlightTime?: StringFieldUpdateOperationsInput | string
    tripOption?: EnumTripOptionFieldUpdateOperationsInput | $Enums.TripOption
    additionalFees?: JsonNullValueInput | InputJsonValue
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    cabinFeatures?: JetForCharterUpdatecabinFeaturesInput | string[]
    inFlightMeals?: BoolFieldUpdateOperationsInput | boolean
    flightAttendant?: BoolFieldUpdateOperationsInput | boolean
    petsAllowed?: BoolFieldUpdateOperationsInput | boolean
    smokingAllowed?: BoolFieldUpdateOperationsInput | boolean
    exteriorImages?: JetForCharterUpdateexteriorImagesInput | string[]
    interiorImages?: JetForCharterUpdateinteriorImagesInput | string[]
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    luxuryCarService?: BoolFieldUpdateOperationsInput | boolean
    vendorId?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endData?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type JetForCharterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jetName?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: StringFieldUpdateOperationsInput | string
    cabinConfiguration?: StringFieldUpdateOperationsInput | string
    maximumRange?: StringFieldUpdateOperationsInput | string
    cruisingSpeed?: StringFieldUpdateOperationsInput | string
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    homeBase?: StringFieldUpdateOperationsInput | string
    availableRoutes?: StringFieldUpdateOperationsInput | string
    operatingDays?: StringFieldUpdateOperationsInput | string
    noticeRequired?: StringFieldUpdateOperationsInput | string
    pricePerHour?: StringFieldUpdateOperationsInput | string
    minimumFlightTime?: StringFieldUpdateOperationsInput | string
    tripOption?: EnumTripOptionFieldUpdateOperationsInput | $Enums.TripOption
    additionalFees?: JsonNullValueInput | InputJsonValue
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    cabinFeatures?: JetForCharterUpdatecabinFeaturesInput | string[]
    inFlightMeals?: BoolFieldUpdateOperationsInput | boolean
    flightAttendant?: BoolFieldUpdateOperationsInput | boolean
    petsAllowed?: BoolFieldUpdateOperationsInput | boolean
    smokingAllowed?: BoolFieldUpdateOperationsInput | boolean
    exteriorImages?: JetForCharterUpdateexteriorImagesInput | string[]
    interiorImages?: JetForCharterUpdateinteriorImagesInput | string[]
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    luxuryCarService?: BoolFieldUpdateOperationsInput | boolean
    vendorId?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endData?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type JetForCharterCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    jetName: string
    aircraftType: string
    manufacturer: string
    yearOfManufacture: string
    registrationNumber: string
    seatingCapacity: string
    cabinConfiguration: string
    maximumRange: string
    cruisingSpeed: string
    baggageCapacity: string
    homeBase: string
    availableRoutes: string
    operatingDays: string
    noticeRequired: string
    pricePerHour: string
    minimumFlightTime: string
    tripOption: $Enums.TripOption
    additionalFees: JsonNullValueInput | InputJsonValue
    discounts?: string | null
    cabinFeatures?: JetForCharterCreatecabinFeaturesInput | string[]
    inFlightMeals?: boolean
    flightAttendant?: boolean
    petsAllowed?: boolean
    smokingAllowed?: boolean
    exteriorImages?: JetForCharterCreateexteriorImagesInput | string[]
    interiorImages?: JetForCharterCreateinteriorImagesInput | string[]
    videoLink?: string | null
    luxuryCarService?: boolean
    vendorId: string
    sponsored?: boolean
    sponsoredType?: string
    endData?: Date | string
    transactionSignature?: string
    transactionLink?: string
    status?: string
    views?: number
  }

  export type JetForCharterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jetName?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: StringFieldUpdateOperationsInput | string
    cabinConfiguration?: StringFieldUpdateOperationsInput | string
    maximumRange?: StringFieldUpdateOperationsInput | string
    cruisingSpeed?: StringFieldUpdateOperationsInput | string
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    homeBase?: StringFieldUpdateOperationsInput | string
    availableRoutes?: StringFieldUpdateOperationsInput | string
    operatingDays?: StringFieldUpdateOperationsInput | string
    noticeRequired?: StringFieldUpdateOperationsInput | string
    pricePerHour?: StringFieldUpdateOperationsInput | string
    minimumFlightTime?: StringFieldUpdateOperationsInput | string
    tripOption?: EnumTripOptionFieldUpdateOperationsInput | $Enums.TripOption
    additionalFees?: JsonNullValueInput | InputJsonValue
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    cabinFeatures?: JetForCharterUpdatecabinFeaturesInput | string[]
    inFlightMeals?: BoolFieldUpdateOperationsInput | boolean
    flightAttendant?: BoolFieldUpdateOperationsInput | boolean
    petsAllowed?: BoolFieldUpdateOperationsInput | boolean
    smokingAllowed?: BoolFieldUpdateOperationsInput | boolean
    exteriorImages?: JetForCharterUpdateexteriorImagesInput | string[]
    interiorImages?: JetForCharterUpdateinteriorImagesInput | string[]
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    luxuryCarService?: BoolFieldUpdateOperationsInput | boolean
    vendorId?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endData?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type JetForCharterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jetName?: StringFieldUpdateOperationsInput | string
    aircraftType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: StringFieldUpdateOperationsInput | string
    registrationNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: StringFieldUpdateOperationsInput | string
    cabinConfiguration?: StringFieldUpdateOperationsInput | string
    maximumRange?: StringFieldUpdateOperationsInput | string
    cruisingSpeed?: StringFieldUpdateOperationsInput | string
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    homeBase?: StringFieldUpdateOperationsInput | string
    availableRoutes?: StringFieldUpdateOperationsInput | string
    operatingDays?: StringFieldUpdateOperationsInput | string
    noticeRequired?: StringFieldUpdateOperationsInput | string
    pricePerHour?: StringFieldUpdateOperationsInput | string
    minimumFlightTime?: StringFieldUpdateOperationsInput | string
    tripOption?: EnumTripOptionFieldUpdateOperationsInput | $Enums.TripOption
    additionalFees?: JsonNullValueInput | InputJsonValue
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    cabinFeatures?: JetForCharterUpdatecabinFeaturesInput | string[]
    inFlightMeals?: BoolFieldUpdateOperationsInput | boolean
    flightAttendant?: BoolFieldUpdateOperationsInput | boolean
    petsAllowed?: BoolFieldUpdateOperationsInput | boolean
    smokingAllowed?: BoolFieldUpdateOperationsInput | boolean
    exteriorImages?: JetForCharterUpdateexteriorImagesInput | string[]
    interiorImages?: JetForCharterUpdateinteriorImagesInput | string[]
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    luxuryCarService?: BoolFieldUpdateOperationsInput | boolean
    vendorId?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endData?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type JetForSaleMessagesCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry: string
    listingId: string
    vendorId: string
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type JetForSaleMessagesUncheckedCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry: string
    listingId: string
    vendorId: string
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type JetForSaleMessagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JetForSaleMessagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JetForSaleMessagesCreateManyInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry: string
    listingId: string
    vendorId: string
    message: string
    createdAt?: Date | string
    read?: boolean
  }

  export type JetForSaleMessagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JetForSaleMessagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WalletCreateInput = {
    id?: string
    wallet: string
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    wallet: string
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wallet?: StringFieldUpdateOperationsInput | string
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wallet?: StringFieldUpdateOperationsInput | string
  }

  export type WalletCreateManyInput = {
    id?: string
    wallet: string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wallet?: StringFieldUpdateOperationsInput | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wallet?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    admin?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    admin?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    publicKey?: SortOrder
    admin?: SortOrder
    status?: SortOrder
    vendor?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VendorCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    companyName?: SortOrder
    country?: SortOrder
    phone?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    website?: SortOrder
    description?: SortOrder
    document?: SortOrder
    password?: SortOrder
    brandImage?: SortOrder
    walletAddress?: SortOrder
  }

  export type VendorMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    companyName?: SortOrder
    country?: SortOrder
    phone?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    website?: SortOrder
    description?: SortOrder
    document?: SortOrder
    password?: SortOrder
    brandImage?: SortOrder
    walletAddress?: SortOrder
  }

  export type VendorMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    name?: SortOrder
    companyName?: SortOrder
    country?: SortOrder
    phone?: SortOrder
    serviceType?: SortOrder
    status?: SortOrder
    website?: SortOrder
    description?: SortOrder
    document?: SortOrder
    password?: SortOrder
    brandImage?: SortOrder
    walletAddress?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type JetCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    interiorImageUrls?: SortOrder
    exteriorImageUrls?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    aircraftType?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineType?: SortOrder
    engineThrust?: SortOrder
    certification?: SortOrder
    noiseCompliance?: SortOrder
    lastInspectionDate?: SortOrder
    nextInspectionDue?: SortOrder
    maintenanceStatus?: SortOrder
    previousOwners?: SortOrder
    maintenanceProgram?: SortOrder
    airframeEngineStatus?: SortOrder
    refurbishmentDate?: SortOrder
    wifiConnectivity?: SortOrder
    lavatoryGalleyDetails?: SortOrder
    cabinAmenities?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    deliveryAvailability?: SortOrder
    paymentTxSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
  }

  export type JetAvgOrderByAggregateInput = {
    year?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineHours?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineThrust?: SortOrder
    previousOwners?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    views?: SortOrder
  }

  export type JetMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    aircraftType?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineType?: SortOrder
    engineThrust?: SortOrder
    certification?: SortOrder
    noiseCompliance?: SortOrder
    lastInspectionDate?: SortOrder
    nextInspectionDue?: SortOrder
    maintenanceStatus?: SortOrder
    previousOwners?: SortOrder
    maintenanceProgram?: SortOrder
    airframeEngineStatus?: SortOrder
    refurbishmentDate?: SortOrder
    wifiConnectivity?: SortOrder
    lavatoryGalleyDetails?: SortOrder
    cabinAmenities?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    deliveryAvailability?: SortOrder
    paymentTxSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
  }

  export type JetMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    aircraftType?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineType?: SortOrder
    engineThrust?: SortOrder
    certification?: SortOrder
    noiseCompliance?: SortOrder
    lastInspectionDate?: SortOrder
    nextInspectionDue?: SortOrder
    maintenanceStatus?: SortOrder
    previousOwners?: SortOrder
    maintenanceProgram?: SortOrder
    airframeEngineStatus?: SortOrder
    refurbishmentDate?: SortOrder
    wifiConnectivity?: SortOrder
    lavatoryGalleyDetails?: SortOrder
    cabinAmenities?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    deliveryAvailability?: SortOrder
    paymentTxSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
  }

  export type JetSumOrderByAggregateInput = {
    year?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineHours?: SortOrder
    seatingCapacity?: SortOrder
    cabinHeight?: SortOrder
    cabinWidth?: SortOrder
    cabinLength?: SortOrder
    baggageCapacity?: SortOrder
    numberOfEngines?: SortOrder
    engineThrust?: SortOrder
    previousOwners?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    views?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type JetForBidsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    interiorImageUrls?: SortOrder
    exteriorImageUrls?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    previousOwners?: SortOrder
    maintenanceProgram?: SortOrder
    airframeEngineStatus?: SortOrder
    refurbishmentDate?: SortOrder
    wifiConnectivity?: SortOrder
    lavatoryGalleyDetails?: SortOrder
    cabinAmenities?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    deliveryAvailability?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
    biddingEndDate?: SortOrder
    minimumBidIncrement?: SortOrder
    biddingStatus?: SortOrder
    currentBid?: SortOrder
    bidCount?: SortOrder
  }

  export type JetForBidsAvgOrderByAggregateInput = {
    year?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineHours?: SortOrder
    previousOwners?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    views?: SortOrder
    minimumBidIncrement?: SortOrder
    currentBid?: SortOrder
    bidCount?: SortOrder
  }

  export type JetForBidsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    previousOwners?: SortOrder
    maintenanceProgram?: SortOrder
    airframeEngineStatus?: SortOrder
    refurbishmentDate?: SortOrder
    wifiConnectivity?: SortOrder
    lavatoryGalleyDetails?: SortOrder
    cabinAmenities?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    deliveryAvailability?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
    biddingEndDate?: SortOrder
    minimumBidIncrement?: SortOrder
    biddingStatus?: SortOrder
    currentBid?: SortOrder
    bidCount?: SortOrder
  }

  export type JetForBidsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    manufacturer?: SortOrder
    otherManufacturer?: SortOrder
    model?: SortOrder
    year?: SortOrder
    serialNumber?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineMakeModel?: SortOrder
    engineHours?: SortOrder
    avionicsSuite?: SortOrder
    interiorConfig?: SortOrder
    price?: SortOrder
    currentLocation?: SortOrder
    registrationNumber?: SortOrder
    contactDetails?: SortOrder
    previousOwners?: SortOrder
    maintenanceProgram?: SortOrder
    airframeEngineStatus?: SortOrder
    refurbishmentDate?: SortOrder
    wifiConnectivity?: SortOrder
    lavatoryGalleyDetails?: SortOrder
    cabinAmenities?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    deliveryAvailability?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    end_date?: SortOrder
    biddingEndDate?: SortOrder
    minimumBidIncrement?: SortOrder
    biddingStatus?: SortOrder
    currentBid?: SortOrder
    bidCount?: SortOrder
  }

  export type JetForBidsSumOrderByAggregateInput = {
    year?: SortOrder
    totalTimeSinceNew?: SortOrder
    totalLandings?: SortOrder
    engineHours?: SortOrder
    previousOwners?: SortOrder
    range?: SortOrder
    cruiseSpeed?: SortOrder
    maxAltitude?: SortOrder
    runwayLength?: SortOrder
    emptyWeight?: SortOrder
    maxTakeoffWeight?: SortOrder
    views?: SortOrder
    minimumBidIncrement?: SortOrder
    currentBid?: SortOrder
    bidCount?: SortOrder
  }

  export type EnumTripOptionFilter<$PrismaModel = never> = {
    equals?: $Enums.TripOption | EnumTripOptionFieldRefInput<$PrismaModel>
    in?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    not?: NestedEnumTripOptionFilter<$PrismaModel> | $Enums.TripOption
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type JetForCharterCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jetName?: SortOrder
    aircraftType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    seatingCapacity?: SortOrder
    cabinConfiguration?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    homeBase?: SortOrder
    availableRoutes?: SortOrder
    operatingDays?: SortOrder
    noticeRequired?: SortOrder
    pricePerHour?: SortOrder
    minimumFlightTime?: SortOrder
    tripOption?: SortOrder
    additionalFees?: SortOrder
    discounts?: SortOrder
    cabinFeatures?: SortOrder
    inFlightMeals?: SortOrder
    flightAttendant?: SortOrder
    petsAllowed?: SortOrder
    smokingAllowed?: SortOrder
    exteriorImages?: SortOrder
    interiorImages?: SortOrder
    videoLink?: SortOrder
    luxuryCarService?: SortOrder
    vendorId?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endData?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    status?: SortOrder
    views?: SortOrder
  }

  export type JetForCharterAvgOrderByAggregateInput = {
    views?: SortOrder
  }

  export type JetForCharterMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jetName?: SortOrder
    aircraftType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    seatingCapacity?: SortOrder
    cabinConfiguration?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    homeBase?: SortOrder
    availableRoutes?: SortOrder
    operatingDays?: SortOrder
    noticeRequired?: SortOrder
    pricePerHour?: SortOrder
    minimumFlightTime?: SortOrder
    tripOption?: SortOrder
    discounts?: SortOrder
    inFlightMeals?: SortOrder
    flightAttendant?: SortOrder
    petsAllowed?: SortOrder
    smokingAllowed?: SortOrder
    videoLink?: SortOrder
    luxuryCarService?: SortOrder
    vendorId?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endData?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    status?: SortOrder
    views?: SortOrder
  }

  export type JetForCharterMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jetName?: SortOrder
    aircraftType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    seatingCapacity?: SortOrder
    cabinConfiguration?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    homeBase?: SortOrder
    availableRoutes?: SortOrder
    operatingDays?: SortOrder
    noticeRequired?: SortOrder
    pricePerHour?: SortOrder
    minimumFlightTime?: SortOrder
    tripOption?: SortOrder
    discounts?: SortOrder
    inFlightMeals?: SortOrder
    flightAttendant?: SortOrder
    petsAllowed?: SortOrder
    smokingAllowed?: SortOrder
    videoLink?: SortOrder
    luxuryCarService?: SortOrder
    vendorId?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endData?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    status?: SortOrder
    views?: SortOrder
  }

  export type JetForCharterSumOrderByAggregateInput = {
    views?: SortOrder
  }

  export type EnumTripOptionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripOption | EnumTripOptionFieldRefInput<$PrismaModel>
    in?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    not?: NestedEnumTripOptionWithAggregatesFilter<$PrismaModel> | $Enums.TripOption
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripOptionFilter<$PrismaModel>
    _max?: NestedEnumTripOptionFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type JetForSaleMessagesCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForSaleMessagesMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForSaleMessagesMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    wallet?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    wallet?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    wallet?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type JetCreateinteriorImageUrlsInput = {
    set: string[]
  }

  export type JetCreateexteriorImageUrlsInput = {
    set: string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JetUpdateinteriorImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JetUpdateexteriorImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JetForBidsCreateinteriorImageUrlsInput = {
    set: string[]
  }

  export type JetForBidsCreateexteriorImageUrlsInput = {
    set: string[]
  }

  export type JetForBidsUpdateinteriorImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JetForBidsUpdateexteriorImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JetForCharterCreatecabinFeaturesInput = {
    set: string[]
  }

  export type JetForCharterCreateexteriorImagesInput = {
    set: string[]
  }

  export type JetForCharterCreateinteriorImagesInput = {
    set: string[]
  }

  export type EnumTripOptionFieldUpdateOperationsInput = {
    set?: $Enums.TripOption
  }

  export type JetForCharterUpdatecabinFeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JetForCharterUpdateexteriorImagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JetForCharterUpdateinteriorImagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumTripOptionFilter<$PrismaModel = never> = {
    equals?: $Enums.TripOption | EnumTripOptionFieldRefInput<$PrismaModel>
    in?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    not?: NestedEnumTripOptionFilter<$PrismaModel> | $Enums.TripOption
  }

  export type NestedEnumTripOptionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripOption | EnumTripOptionFieldRefInput<$PrismaModel>
    in?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TripOption[] | ListEnumTripOptionFieldRefInput<$PrismaModel>
    not?: NestedEnumTripOptionWithAggregatesFilter<$PrismaModel> | $Enums.TripOption
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTripOptionFilter<$PrismaModel>
    _max?: NestedEnumTripOptionFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}