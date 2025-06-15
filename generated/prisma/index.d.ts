
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
 * Model JetForCharterMessages
 * 
 */
export type JetForCharterMessages = $Result.DefaultSelection<Prisma.$JetForCharterMessagesPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model HelicopterForSaleListing
 * 
 */
export type HelicopterForSaleListing = $Result.DefaultSelection<Prisma.$HelicopterForSaleListingPayload>
/**
 * Model CabinFeature
 * 
 */
export type CabinFeature = $Result.DefaultSelection<Prisma.$CabinFeaturePayload>
/**
 * Model HelicopterMessage
 * 
 */
export type HelicopterMessage = $Result.DefaultSelection<Prisma.$HelicopterMessagePayload>
/**
 * Model HelicopterForCharter
 * 
 */
export type HelicopterForCharter = $Result.DefaultSelection<Prisma.$HelicopterForCharterPayload>
/**
 * Model HelicopterForCharterMessages
 * 
 */
export type HelicopterForCharterMessages = $Result.DefaultSelection<Prisma.$HelicopterForCharterMessagesPayload>

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
   * `prisma.jetForCharterMessages`: Exposes CRUD operations for the **JetForCharterMessages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JetForCharterMessages
    * const jetForCharterMessages = await prisma.jetForCharterMessages.findMany()
    * ```
    */
  get jetForCharterMessages(): Prisma.JetForCharterMessagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.helicopterForSaleListing`: Exposes CRUD operations for the **HelicopterForSaleListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HelicopterForSaleListings
    * const helicopterForSaleListings = await prisma.helicopterForSaleListing.findMany()
    * ```
    */
  get helicopterForSaleListing(): Prisma.HelicopterForSaleListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cabinFeature`: Exposes CRUD operations for the **CabinFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CabinFeatures
    * const cabinFeatures = await prisma.cabinFeature.findMany()
    * ```
    */
  get cabinFeature(): Prisma.CabinFeatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.helicopterMessage`: Exposes CRUD operations for the **HelicopterMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HelicopterMessages
    * const helicopterMessages = await prisma.helicopterMessage.findMany()
    * ```
    */
  get helicopterMessage(): Prisma.HelicopterMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.helicopterForCharter`: Exposes CRUD operations for the **HelicopterForCharter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HelicopterForCharters
    * const helicopterForCharters = await prisma.helicopterForCharter.findMany()
    * ```
    */
  get helicopterForCharter(): Prisma.HelicopterForCharterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.helicopterForCharterMessages`: Exposes CRUD operations for the **HelicopterForCharterMessages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HelicopterForCharterMessages
    * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findMany()
    * ```
    */
  get helicopterForCharterMessages(): Prisma.HelicopterForCharterMessagesDelegate<ExtArgs, ClientOptions>;
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
    JetForCharterMessages: 'JetForCharterMessages',
    Wallet: 'Wallet',
    HelicopterForSaleListing: 'HelicopterForSaleListing',
    CabinFeature: 'CabinFeature',
    HelicopterMessage: 'HelicopterMessage',
    HelicopterForCharter: 'HelicopterForCharter',
    HelicopterForCharterMessages: 'HelicopterForCharterMessages'
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
      modelProps: "user" | "vendor" | "admin" | "jet" | "jetForBids" | "jetForCharter" | "jetForSaleMessages" | "jetForCharterMessages" | "wallet" | "helicopterForSaleListing" | "cabinFeature" | "helicopterMessage" | "helicopterForCharter" | "helicopterForCharterMessages"
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
      JetForCharterMessages: {
        payload: Prisma.$JetForCharterMessagesPayload<ExtArgs>
        fields: Prisma.JetForCharterMessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JetForCharterMessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JetForCharterMessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>
          }
          findFirst: {
            args: Prisma.JetForCharterMessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JetForCharterMessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>
          }
          findMany: {
            args: Prisma.JetForCharterMessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>[]
          }
          create: {
            args: Prisma.JetForCharterMessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>
          }
          createMany: {
            args: Prisma.JetForCharterMessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JetForCharterMessagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>[]
          }
          delete: {
            args: Prisma.JetForCharterMessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>
          }
          update: {
            args: Prisma.JetForCharterMessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>
          }
          deleteMany: {
            args: Prisma.JetForCharterMessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JetForCharterMessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JetForCharterMessagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>[]
          }
          upsert: {
            args: Prisma.JetForCharterMessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JetForCharterMessagesPayload>
          }
          aggregate: {
            args: Prisma.JetForCharterMessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJetForCharterMessages>
          }
          groupBy: {
            args: Prisma.JetForCharterMessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<JetForCharterMessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.JetForCharterMessagesCountArgs<ExtArgs>
            result: $Utils.Optional<JetForCharterMessagesCountAggregateOutputType> | number
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
      HelicopterForSaleListing: {
        payload: Prisma.$HelicopterForSaleListingPayload<ExtArgs>
        fields: Prisma.HelicopterForSaleListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HelicopterForSaleListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HelicopterForSaleListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>
          }
          findFirst: {
            args: Prisma.HelicopterForSaleListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HelicopterForSaleListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>
          }
          findMany: {
            args: Prisma.HelicopterForSaleListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>[]
          }
          create: {
            args: Prisma.HelicopterForSaleListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>
          }
          createMany: {
            args: Prisma.HelicopterForSaleListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HelicopterForSaleListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>[]
          }
          delete: {
            args: Prisma.HelicopterForSaleListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>
          }
          update: {
            args: Prisma.HelicopterForSaleListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>
          }
          deleteMany: {
            args: Prisma.HelicopterForSaleListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HelicopterForSaleListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HelicopterForSaleListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>[]
          }
          upsert: {
            args: Prisma.HelicopterForSaleListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForSaleListingPayload>
          }
          aggregate: {
            args: Prisma.HelicopterForSaleListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHelicopterForSaleListing>
          }
          groupBy: {
            args: Prisma.HelicopterForSaleListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HelicopterForSaleListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HelicopterForSaleListingCountArgs<ExtArgs>
            result: $Utils.Optional<HelicopterForSaleListingCountAggregateOutputType> | number
          }
        }
      }
      CabinFeature: {
        payload: Prisma.$CabinFeaturePayload<ExtArgs>
        fields: Prisma.CabinFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CabinFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CabinFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>
          }
          findFirst: {
            args: Prisma.CabinFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CabinFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>
          }
          findMany: {
            args: Prisma.CabinFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>[]
          }
          create: {
            args: Prisma.CabinFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>
          }
          createMany: {
            args: Prisma.CabinFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CabinFeatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>[]
          }
          delete: {
            args: Prisma.CabinFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>
          }
          update: {
            args: Prisma.CabinFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>
          }
          deleteMany: {
            args: Prisma.CabinFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CabinFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CabinFeatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>[]
          }
          upsert: {
            args: Prisma.CabinFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CabinFeaturePayload>
          }
          aggregate: {
            args: Prisma.CabinFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCabinFeature>
          }
          groupBy: {
            args: Prisma.CabinFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<CabinFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.CabinFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<CabinFeatureCountAggregateOutputType> | number
          }
        }
      }
      HelicopterMessage: {
        payload: Prisma.$HelicopterMessagePayload<ExtArgs>
        fields: Prisma.HelicopterMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HelicopterMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HelicopterMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>
          }
          findFirst: {
            args: Prisma.HelicopterMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HelicopterMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>
          }
          findMany: {
            args: Prisma.HelicopterMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>[]
          }
          create: {
            args: Prisma.HelicopterMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>
          }
          createMany: {
            args: Prisma.HelicopterMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HelicopterMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>[]
          }
          delete: {
            args: Prisma.HelicopterMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>
          }
          update: {
            args: Prisma.HelicopterMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>
          }
          deleteMany: {
            args: Prisma.HelicopterMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HelicopterMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HelicopterMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>[]
          }
          upsert: {
            args: Prisma.HelicopterMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterMessagePayload>
          }
          aggregate: {
            args: Prisma.HelicopterMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHelicopterMessage>
          }
          groupBy: {
            args: Prisma.HelicopterMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<HelicopterMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.HelicopterMessageCountArgs<ExtArgs>
            result: $Utils.Optional<HelicopterMessageCountAggregateOutputType> | number
          }
        }
      }
      HelicopterForCharter: {
        payload: Prisma.$HelicopterForCharterPayload<ExtArgs>
        fields: Prisma.HelicopterForCharterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HelicopterForCharterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HelicopterForCharterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>
          }
          findFirst: {
            args: Prisma.HelicopterForCharterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HelicopterForCharterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>
          }
          findMany: {
            args: Prisma.HelicopterForCharterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>[]
          }
          create: {
            args: Prisma.HelicopterForCharterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>
          }
          createMany: {
            args: Prisma.HelicopterForCharterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HelicopterForCharterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>[]
          }
          delete: {
            args: Prisma.HelicopterForCharterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>
          }
          update: {
            args: Prisma.HelicopterForCharterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>
          }
          deleteMany: {
            args: Prisma.HelicopterForCharterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HelicopterForCharterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HelicopterForCharterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>[]
          }
          upsert: {
            args: Prisma.HelicopterForCharterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterPayload>
          }
          aggregate: {
            args: Prisma.HelicopterForCharterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHelicopterForCharter>
          }
          groupBy: {
            args: Prisma.HelicopterForCharterGroupByArgs<ExtArgs>
            result: $Utils.Optional<HelicopterForCharterGroupByOutputType>[]
          }
          count: {
            args: Prisma.HelicopterForCharterCountArgs<ExtArgs>
            result: $Utils.Optional<HelicopterForCharterCountAggregateOutputType> | number
          }
        }
      }
      HelicopterForCharterMessages: {
        payload: Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>
        fields: Prisma.HelicopterForCharterMessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HelicopterForCharterMessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HelicopterForCharterMessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>
          }
          findFirst: {
            args: Prisma.HelicopterForCharterMessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HelicopterForCharterMessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>
          }
          findMany: {
            args: Prisma.HelicopterForCharterMessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>[]
          }
          create: {
            args: Prisma.HelicopterForCharterMessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>
          }
          createMany: {
            args: Prisma.HelicopterForCharterMessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HelicopterForCharterMessagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>[]
          }
          delete: {
            args: Prisma.HelicopterForCharterMessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>
          }
          update: {
            args: Prisma.HelicopterForCharterMessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>
          }
          deleteMany: {
            args: Prisma.HelicopterForCharterMessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HelicopterForCharterMessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HelicopterForCharterMessagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>[]
          }
          upsert: {
            args: Prisma.HelicopterForCharterMessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HelicopterForCharterMessagesPayload>
          }
          aggregate: {
            args: Prisma.HelicopterForCharterMessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHelicopterForCharterMessages>
          }
          groupBy: {
            args: Prisma.HelicopterForCharterMessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<HelicopterForCharterMessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.HelicopterForCharterMessagesCountArgs<ExtArgs>
            result: $Utils.Optional<HelicopterForCharterMessagesCountAggregateOutputType> | number
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
    jetForCharterMessages?: JetForCharterMessagesOmit
    wallet?: WalletOmit
    helicopterForSaleListing?: HelicopterForSaleListingOmit
    cabinFeature?: CabinFeatureOmit
    helicopterMessage?: HelicopterMessageOmit
    helicopterForCharter?: HelicopterForCharterOmit
    helicopterForCharterMessages?: HelicopterForCharterMessagesOmit
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
   * Count Type HelicopterForSaleListingCountOutputType
   */

  export type HelicopterForSaleListingCountOutputType = {
    cabinFeatures: number
  }

  export type HelicopterForSaleListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cabinFeatures?: boolean | HelicopterForSaleListingCountOutputTypeCountCabinFeaturesArgs
  }

  // Custom InputTypes
  /**
   * HelicopterForSaleListingCountOutputType without action
   */
  export type HelicopterForSaleListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListingCountOutputType
     */
    select?: HelicopterForSaleListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HelicopterForSaleListingCountOutputType without action
   */
  export type HelicopterForSaleListingCountOutputTypeCountCabinFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CabinFeatureWhereInput
  }


  /**
   * Count Type CabinFeatureCountOutputType
   */

  export type CabinFeatureCountOutputType = {
    helicopters: number
  }

  export type CabinFeatureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    helicopters?: boolean | CabinFeatureCountOutputTypeCountHelicoptersArgs
  }

  // Custom InputTypes
  /**
   * CabinFeatureCountOutputType without action
   */
  export type CabinFeatureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeatureCountOutputType
     */
    select?: CabinFeatureCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CabinFeatureCountOutputType without action
   */
  export type CabinFeatureCountOutputTypeCountHelicoptersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HelicopterForSaleListingWhereInput
  }


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
    end_date: Date | null
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
    end_date: Date | null
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
    end_date: number
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
    end_date?: true
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
    end_date?: true
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
    end_date?: true
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
    end_date: Date
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
    end_date?: boolean
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
    end_date?: boolean
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
    end_date?: boolean
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
    end_date?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    status?: boolean
    views?: boolean
  }

  export type JetForCharterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "jetName" | "aircraftType" | "manufacturer" | "yearOfManufacture" | "registrationNumber" | "seatingCapacity" | "cabinConfiguration" | "maximumRange" | "cruisingSpeed" | "baggageCapacity" | "homeBase" | "availableRoutes" | "operatingDays" | "noticeRequired" | "pricePerHour" | "minimumFlightTime" | "tripOption" | "additionalFees" | "discounts" | "cabinFeatures" | "inFlightMeals" | "flightAttendant" | "petsAllowed" | "smokingAllowed" | "exteriorImages" | "interiorImages" | "videoLink" | "luxuryCarService" | "vendorId" | "sponsored" | "sponsoredType" | "end_date" | "transactionSignature" | "transactionLink" | "status" | "views", ExtArgs["result"]["jetForCharter"]>

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
      end_date: Date
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
    readonly end_date: FieldRef<"JetForCharter", 'DateTime'>
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
   * Model JetForCharterMessages
   */

  export type AggregateJetForCharterMessages = {
    _count: JetForCharterMessagesCountAggregateOutputType | null
    _avg: JetForCharterMessagesAvgAggregateOutputType | null
    _sum: JetForCharterMessagesSumAggregateOutputType | null
    _min: JetForCharterMessagesMinAggregateOutputType | null
    _max: JetForCharterMessagesMaxAggregateOutputType | null
  }

  export type JetForCharterMessagesAvgAggregateOutputType = {
    passengerCount: number | null
  }

  export type JetForCharterMessagesSumAggregateOutputType = {
    passengerCount: number | null
  }

  export type JetForCharterMessagesMinAggregateOutputType = {
    id: string | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    departureLocation: string | null
    arrivalLocation: string | null
    departureDate: Date | null
    returnDate: Date | null
    passengerCount: number | null
    specialRequests: string | null
    listingId: string | null
    vendorId: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type JetForCharterMessagesMaxAggregateOutputType = {
    id: string | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    departureLocation: string | null
    arrivalLocation: string | null
    departureDate: Date | null
    returnDate: Date | null
    passengerCount: number | null
    specialRequests: string | null
    listingId: string | null
    vendorId: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type JetForCharterMessagesCountAggregateOutputType = {
    id: number
    customerName: number
    customerEmail: number
    customerCountry: number
    departureLocation: number
    arrivalLocation: number
    departureDate: number
    returnDate: number
    passengerCount: number
    specialRequests: number
    listingId: number
    vendorId: number
    createdAt: number
    read: number
    _all: number
  }


  export type JetForCharterMessagesAvgAggregateInputType = {
    passengerCount?: true
  }

  export type JetForCharterMessagesSumAggregateInputType = {
    passengerCount?: true
  }

  export type JetForCharterMessagesMinAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    departureLocation?: true
    arrivalLocation?: true
    departureDate?: true
    returnDate?: true
    passengerCount?: true
    specialRequests?: true
    listingId?: true
    vendorId?: true
    createdAt?: true
    read?: true
  }

  export type JetForCharterMessagesMaxAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    departureLocation?: true
    arrivalLocation?: true
    departureDate?: true
    returnDate?: true
    passengerCount?: true
    specialRequests?: true
    listingId?: true
    vendorId?: true
    createdAt?: true
    read?: true
  }

  export type JetForCharterMessagesCountAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    departureLocation?: true
    arrivalLocation?: true
    departureDate?: true
    returnDate?: true
    passengerCount?: true
    specialRequests?: true
    listingId?: true
    vendorId?: true
    createdAt?: true
    read?: true
    _all?: true
  }

  export type JetForCharterMessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForCharterMessages to aggregate.
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharterMessages to fetch.
     */
    orderBy?: JetForCharterMessagesOrderByWithRelationInput | JetForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JetForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JetForCharterMessages
    **/
    _count?: true | JetForCharterMessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JetForCharterMessagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JetForCharterMessagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JetForCharterMessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JetForCharterMessagesMaxAggregateInputType
  }

  export type GetJetForCharterMessagesAggregateType<T extends JetForCharterMessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateJetForCharterMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJetForCharterMessages[P]>
      : GetScalarType<T[P], AggregateJetForCharterMessages[P]>
  }




  export type JetForCharterMessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JetForCharterMessagesWhereInput
    orderBy?: JetForCharterMessagesOrderByWithAggregationInput | JetForCharterMessagesOrderByWithAggregationInput[]
    by: JetForCharterMessagesScalarFieldEnum[] | JetForCharterMessagesScalarFieldEnum
    having?: JetForCharterMessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JetForCharterMessagesCountAggregateInputType | true
    _avg?: JetForCharterMessagesAvgAggregateInputType
    _sum?: JetForCharterMessagesSumAggregateInputType
    _min?: JetForCharterMessagesMinAggregateInputType
    _max?: JetForCharterMessagesMaxAggregateInputType
  }

  export type JetForCharterMessagesGroupByOutputType = {
    id: string
    customerName: string
    customerEmail: string
    customerCountry: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date
    returnDate: Date | null
    passengerCount: number
    specialRequests: string | null
    listingId: string
    vendorId: string
    createdAt: Date
    read: boolean
    _count: JetForCharterMessagesCountAggregateOutputType | null
    _avg: JetForCharterMessagesAvgAggregateOutputType | null
    _sum: JetForCharterMessagesSumAggregateOutputType | null
    _min: JetForCharterMessagesMinAggregateOutputType | null
    _max: JetForCharterMessagesMaxAggregateOutputType | null
  }

  type GetJetForCharterMessagesGroupByPayload<T extends JetForCharterMessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JetForCharterMessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JetForCharterMessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JetForCharterMessagesGroupByOutputType[P]>
            : GetScalarType<T[P], JetForCharterMessagesGroupByOutputType[P]>
        }
      >
    >


  export type JetForCharterMessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["jetForCharterMessages"]>

  export type JetForCharterMessagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["jetForCharterMessages"]>

  export type JetForCharterMessagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["jetForCharterMessages"]>

  export type JetForCharterMessagesSelectScalar = {
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }

  export type JetForCharterMessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "customerEmail" | "customerCountry" | "departureLocation" | "arrivalLocation" | "departureDate" | "returnDate" | "passengerCount" | "specialRequests" | "listingId" | "vendorId" | "createdAt" | "read", ExtArgs["result"]["jetForCharterMessages"]>

  export type $JetForCharterMessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JetForCharterMessages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerName: string
      customerEmail: string
      customerCountry: string | null
      departureLocation: string
      arrivalLocation: string
      departureDate: Date
      returnDate: Date | null
      passengerCount: number
      specialRequests: string | null
      listingId: string
      vendorId: string
      createdAt: Date
      read: boolean
    }, ExtArgs["result"]["jetForCharterMessages"]>
    composites: {}
  }

  type JetForCharterMessagesGetPayload<S extends boolean | null | undefined | JetForCharterMessagesDefaultArgs> = $Result.GetResult<Prisma.$JetForCharterMessagesPayload, S>

  type JetForCharterMessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JetForCharterMessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JetForCharterMessagesCountAggregateInputType | true
    }

  export interface JetForCharterMessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JetForCharterMessages'], meta: { name: 'JetForCharterMessages' } }
    /**
     * Find zero or one JetForCharterMessages that matches the filter.
     * @param {JetForCharterMessagesFindUniqueArgs} args - Arguments to find a JetForCharterMessages
     * @example
     * // Get one JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JetForCharterMessagesFindUniqueArgs>(args: SelectSubset<T, JetForCharterMessagesFindUniqueArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JetForCharterMessages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JetForCharterMessagesFindUniqueOrThrowArgs} args - Arguments to find a JetForCharterMessages
     * @example
     * // Get one JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JetForCharterMessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, JetForCharterMessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForCharterMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesFindFirstArgs} args - Arguments to find a JetForCharterMessages
     * @example
     * // Get one JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JetForCharterMessagesFindFirstArgs>(args?: SelectSubset<T, JetForCharterMessagesFindFirstArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JetForCharterMessages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesFindFirstOrThrowArgs} args - Arguments to find a JetForCharterMessages
     * @example
     * // Get one JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JetForCharterMessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, JetForCharterMessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JetForCharterMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.findMany()
     * 
     * // Get first 10 JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jetForCharterMessagesWithIdOnly = await prisma.jetForCharterMessages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JetForCharterMessagesFindManyArgs>(args?: SelectSubset<T, JetForCharterMessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JetForCharterMessages.
     * @param {JetForCharterMessagesCreateArgs} args - Arguments to create a JetForCharterMessages.
     * @example
     * // Create one JetForCharterMessages
     * const JetForCharterMessages = await prisma.jetForCharterMessages.create({
     *   data: {
     *     // ... data to create a JetForCharterMessages
     *   }
     * })
     * 
     */
    create<T extends JetForCharterMessagesCreateArgs>(args: SelectSubset<T, JetForCharterMessagesCreateArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JetForCharterMessages.
     * @param {JetForCharterMessagesCreateManyArgs} args - Arguments to create many JetForCharterMessages.
     * @example
     * // Create many JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JetForCharterMessagesCreateManyArgs>(args?: SelectSubset<T, JetForCharterMessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JetForCharterMessages and returns the data saved in the database.
     * @param {JetForCharterMessagesCreateManyAndReturnArgs} args - Arguments to create many JetForCharterMessages.
     * @example
     * // Create many JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JetForCharterMessages and only return the `id`
     * const jetForCharterMessagesWithIdOnly = await prisma.jetForCharterMessages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JetForCharterMessagesCreateManyAndReturnArgs>(args?: SelectSubset<T, JetForCharterMessagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JetForCharterMessages.
     * @param {JetForCharterMessagesDeleteArgs} args - Arguments to delete one JetForCharterMessages.
     * @example
     * // Delete one JetForCharterMessages
     * const JetForCharterMessages = await prisma.jetForCharterMessages.delete({
     *   where: {
     *     // ... filter to delete one JetForCharterMessages
     *   }
     * })
     * 
     */
    delete<T extends JetForCharterMessagesDeleteArgs>(args: SelectSubset<T, JetForCharterMessagesDeleteArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JetForCharterMessages.
     * @param {JetForCharterMessagesUpdateArgs} args - Arguments to update one JetForCharterMessages.
     * @example
     * // Update one JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JetForCharterMessagesUpdateArgs>(args: SelectSubset<T, JetForCharterMessagesUpdateArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JetForCharterMessages.
     * @param {JetForCharterMessagesDeleteManyArgs} args - Arguments to filter JetForCharterMessages to delete.
     * @example
     * // Delete a few JetForCharterMessages
     * const { count } = await prisma.jetForCharterMessages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JetForCharterMessagesDeleteManyArgs>(args?: SelectSubset<T, JetForCharterMessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JetForCharterMessagesUpdateManyArgs>(args: SelectSubset<T, JetForCharterMessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JetForCharterMessages and returns the data updated in the database.
     * @param {JetForCharterMessagesUpdateManyAndReturnArgs} args - Arguments to update many JetForCharterMessages.
     * @example
     * // Update many JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JetForCharterMessages and only return the `id`
     * const jetForCharterMessagesWithIdOnly = await prisma.jetForCharterMessages.updateManyAndReturn({
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
    updateManyAndReturn<T extends JetForCharterMessagesUpdateManyAndReturnArgs>(args: SelectSubset<T, JetForCharterMessagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JetForCharterMessages.
     * @param {JetForCharterMessagesUpsertArgs} args - Arguments to update or create a JetForCharterMessages.
     * @example
     * // Update or create a JetForCharterMessages
     * const jetForCharterMessages = await prisma.jetForCharterMessages.upsert({
     *   create: {
     *     // ... data to create a JetForCharterMessages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JetForCharterMessages we want to update
     *   }
     * })
     */
    upsert<T extends JetForCharterMessagesUpsertArgs>(args: SelectSubset<T, JetForCharterMessagesUpsertArgs<ExtArgs>>): Prisma__JetForCharterMessagesClient<$Result.GetResult<Prisma.$JetForCharterMessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JetForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesCountArgs} args - Arguments to filter JetForCharterMessages to count.
     * @example
     * // Count the number of JetForCharterMessages
     * const count = await prisma.jetForCharterMessages.count({
     *   where: {
     *     // ... the filter for the JetForCharterMessages we want to count
     *   }
     * })
    **/
    count<T extends JetForCharterMessagesCountArgs>(
      args?: Subset<T, JetForCharterMessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JetForCharterMessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JetForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JetForCharterMessagesAggregateArgs>(args: Subset<T, JetForCharterMessagesAggregateArgs>): Prisma.PrismaPromise<GetJetForCharterMessagesAggregateType<T>>

    /**
     * Group by JetForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JetForCharterMessagesGroupByArgs} args - Group by arguments.
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
      T extends JetForCharterMessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JetForCharterMessagesGroupByArgs['orderBy'] }
        : { orderBy?: JetForCharterMessagesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JetForCharterMessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJetForCharterMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JetForCharterMessages model
   */
  readonly fields: JetForCharterMessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JetForCharterMessages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JetForCharterMessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the JetForCharterMessages model
   */
  interface JetForCharterMessagesFieldRefs {
    readonly id: FieldRef<"JetForCharterMessages", 'String'>
    readonly customerName: FieldRef<"JetForCharterMessages", 'String'>
    readonly customerEmail: FieldRef<"JetForCharterMessages", 'String'>
    readonly customerCountry: FieldRef<"JetForCharterMessages", 'String'>
    readonly departureLocation: FieldRef<"JetForCharterMessages", 'String'>
    readonly arrivalLocation: FieldRef<"JetForCharterMessages", 'String'>
    readonly departureDate: FieldRef<"JetForCharterMessages", 'DateTime'>
    readonly returnDate: FieldRef<"JetForCharterMessages", 'DateTime'>
    readonly passengerCount: FieldRef<"JetForCharterMessages", 'Int'>
    readonly specialRequests: FieldRef<"JetForCharterMessages", 'String'>
    readonly listingId: FieldRef<"JetForCharterMessages", 'String'>
    readonly vendorId: FieldRef<"JetForCharterMessages", 'String'>
    readonly createdAt: FieldRef<"JetForCharterMessages", 'DateTime'>
    readonly read: FieldRef<"JetForCharterMessages", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * JetForCharterMessages findUnique
   */
  export type JetForCharterMessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharterMessages to fetch.
     */
    where: JetForCharterMessagesWhereUniqueInput
  }

  /**
   * JetForCharterMessages findUniqueOrThrow
   */
  export type JetForCharterMessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharterMessages to fetch.
     */
    where: JetForCharterMessagesWhereUniqueInput
  }

  /**
   * JetForCharterMessages findFirst
   */
  export type JetForCharterMessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharterMessages to fetch.
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharterMessages to fetch.
     */
    orderBy?: JetForCharterMessagesOrderByWithRelationInput | JetForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForCharterMessages.
     */
    cursor?: JetForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForCharterMessages.
     */
    distinct?: JetForCharterMessagesScalarFieldEnum | JetForCharterMessagesScalarFieldEnum[]
  }

  /**
   * JetForCharterMessages findFirstOrThrow
   */
  export type JetForCharterMessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharterMessages to fetch.
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharterMessages to fetch.
     */
    orderBy?: JetForCharterMessagesOrderByWithRelationInput | JetForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JetForCharterMessages.
     */
    cursor?: JetForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JetForCharterMessages.
     */
    distinct?: JetForCharterMessagesScalarFieldEnum | JetForCharterMessagesScalarFieldEnum[]
  }

  /**
   * JetForCharterMessages findMany
   */
  export type JetForCharterMessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which JetForCharterMessages to fetch.
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JetForCharterMessages to fetch.
     */
    orderBy?: JetForCharterMessagesOrderByWithRelationInput | JetForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JetForCharterMessages.
     */
    cursor?: JetForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JetForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JetForCharterMessages.
     */
    skip?: number
    distinct?: JetForCharterMessagesScalarFieldEnum | JetForCharterMessagesScalarFieldEnum[]
  }

  /**
   * JetForCharterMessages create
   */
  export type JetForCharterMessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data needed to create a JetForCharterMessages.
     */
    data: XOR<JetForCharterMessagesCreateInput, JetForCharterMessagesUncheckedCreateInput>
  }

  /**
   * JetForCharterMessages createMany
   */
  export type JetForCharterMessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JetForCharterMessages.
     */
    data: JetForCharterMessagesCreateManyInput | JetForCharterMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForCharterMessages createManyAndReturn
   */
  export type JetForCharterMessagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data used to create many JetForCharterMessages.
     */
    data: JetForCharterMessagesCreateManyInput | JetForCharterMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JetForCharterMessages update
   */
  export type JetForCharterMessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data needed to update a JetForCharterMessages.
     */
    data: XOR<JetForCharterMessagesUpdateInput, JetForCharterMessagesUncheckedUpdateInput>
    /**
     * Choose, which JetForCharterMessages to update.
     */
    where: JetForCharterMessagesWhereUniqueInput
  }

  /**
   * JetForCharterMessages updateMany
   */
  export type JetForCharterMessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JetForCharterMessages.
     */
    data: XOR<JetForCharterMessagesUpdateManyMutationInput, JetForCharterMessagesUncheckedUpdateManyInput>
    /**
     * Filter which JetForCharterMessages to update
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * Limit how many JetForCharterMessages to update.
     */
    limit?: number
  }

  /**
   * JetForCharterMessages updateManyAndReturn
   */
  export type JetForCharterMessagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data used to update JetForCharterMessages.
     */
    data: XOR<JetForCharterMessagesUpdateManyMutationInput, JetForCharterMessagesUncheckedUpdateManyInput>
    /**
     * Filter which JetForCharterMessages to update
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * Limit how many JetForCharterMessages to update.
     */
    limit?: number
  }

  /**
   * JetForCharterMessages upsert
   */
  export type JetForCharterMessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * The filter to search for the JetForCharterMessages to update in case it exists.
     */
    where: JetForCharterMessagesWhereUniqueInput
    /**
     * In case the JetForCharterMessages found by the `where` argument doesn't exist, create a new JetForCharterMessages with this data.
     */
    create: XOR<JetForCharterMessagesCreateInput, JetForCharterMessagesUncheckedCreateInput>
    /**
     * In case the JetForCharterMessages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JetForCharterMessagesUpdateInput, JetForCharterMessagesUncheckedUpdateInput>
  }

  /**
   * JetForCharterMessages delete
   */
  export type JetForCharterMessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter which JetForCharterMessages to delete.
     */
    where: JetForCharterMessagesWhereUniqueInput
  }

  /**
   * JetForCharterMessages deleteMany
   */
  export type JetForCharterMessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JetForCharterMessages to delete
     */
    where?: JetForCharterMessagesWhereInput
    /**
     * Limit how many JetForCharterMessages to delete.
     */
    limit?: number
  }

  /**
   * JetForCharterMessages without action
   */
  export type JetForCharterMessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JetForCharterMessages
     */
    select?: JetForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JetForCharterMessages
     */
    omit?: JetForCharterMessagesOmit<ExtArgs> | null
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
    data?: XOR<WalletCreateInput, WalletUncheckedCreateInput>
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
   * Model HelicopterForSaleListing
   */

  export type AggregateHelicopterForSaleListing = {
    _count: HelicopterForSaleListingCountAggregateOutputType | null
    _avg: HelicopterForSaleListingAvgAggregateOutputType | null
    _sum: HelicopterForSaleListingSumAggregateOutputType | null
    _min: HelicopterForSaleListingMinAggregateOutputType | null
    _max: HelicopterForSaleListingMaxAggregateOutputType | null
  }

  export type HelicopterForSaleListingAvgAggregateOutputType = {
    yearOfManufacture: number | null
    seatingCapacity: number | null
    maximumRange: number | null
    cruisingSpeed: number | null
    totalFlightHours: number | null
    salePrice: number | null
    views: number | null
  }

  export type HelicopterForSaleListingSumAggregateOutputType = {
    yearOfManufacture: number | null
    seatingCapacity: number | null
    maximumRange: number | null
    cruisingSpeed: number | null
    totalFlightHours: number | null
    salePrice: number | null
    views: number | null
  }

  export type HelicopterForSaleListingMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    helicopterName: string | null
    helicopterType: string | null
    manufacturer: string | null
    yearOfManufacture: number | null
    registrationNumber: string | null
    serialNumber: string | null
    seatingCapacity: number | null
    maximumRange: number | null
    cruisingSpeed: number | null
    baggageCapacity: string | null
    condition: string | null
    totalFlightHours: number | null
    maintenanceHistory: string | null
    lastInspection: Date | null
    salePrice: number | null
    discounts: string | null
    avionics: string | null
    emergencyEquipment: boolean | null
    cargoHook: boolean | null
    videoLink: string | null
    additionalEquipment: string | null
    transactionSignature: string | null
    transactionLink: string | null
    vendorId: string | null
    views: number | null
    status: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    endDate: Date | null
  }

  export type HelicopterForSaleListingMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    helicopterName: string | null
    helicopterType: string | null
    manufacturer: string | null
    yearOfManufacture: number | null
    registrationNumber: string | null
    serialNumber: string | null
    seatingCapacity: number | null
    maximumRange: number | null
    cruisingSpeed: number | null
    baggageCapacity: string | null
    condition: string | null
    totalFlightHours: number | null
    maintenanceHistory: string | null
    lastInspection: Date | null
    salePrice: number | null
    discounts: string | null
    avionics: string | null
    emergencyEquipment: boolean | null
    cargoHook: boolean | null
    videoLink: string | null
    additionalEquipment: string | null
    transactionSignature: string | null
    transactionLink: string | null
    vendorId: string | null
    views: number | null
    status: string | null
    sponsored: boolean | null
    sponsoredType: string | null
    endDate: Date | null
  }

  export type HelicopterForSaleListingCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    helicopterName: number
    helicopterType: number
    manufacturer: number
    yearOfManufacture: number
    registrationNumber: number
    serialNumber: number
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: number
    condition: number
    totalFlightHours: number
    maintenanceHistory: number
    lastInspection: number
    salePrice: number
    discounts: number
    avionics: number
    emergencyEquipment: number
    cargoHook: number
    videoLink: number
    exteriorImageUrls: number
    interiorImageUrls: number
    additionalEquipment: number
    transactionSignature: number
    transactionLink: number
    vendorId: number
    views: number
    status: number
    sponsored: number
    sponsoredType: number
    endDate: number
    _all: number
  }


  export type HelicopterForSaleListingAvgAggregateInputType = {
    yearOfManufacture?: true
    seatingCapacity?: true
    maximumRange?: true
    cruisingSpeed?: true
    totalFlightHours?: true
    salePrice?: true
    views?: true
  }

  export type HelicopterForSaleListingSumAggregateInputType = {
    yearOfManufacture?: true
    seatingCapacity?: true
    maximumRange?: true
    cruisingSpeed?: true
    totalFlightHours?: true
    salePrice?: true
    views?: true
  }

  export type HelicopterForSaleListingMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    helicopterName?: true
    helicopterType?: true
    manufacturer?: true
    yearOfManufacture?: true
    registrationNumber?: true
    serialNumber?: true
    seatingCapacity?: true
    maximumRange?: true
    cruisingSpeed?: true
    baggageCapacity?: true
    condition?: true
    totalFlightHours?: true
    maintenanceHistory?: true
    lastInspection?: true
    salePrice?: true
    discounts?: true
    avionics?: true
    emergencyEquipment?: true
    cargoHook?: true
    videoLink?: true
    additionalEquipment?: true
    transactionSignature?: true
    transactionLink?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    endDate?: true
  }

  export type HelicopterForSaleListingMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    helicopterName?: true
    helicopterType?: true
    manufacturer?: true
    yearOfManufacture?: true
    registrationNumber?: true
    serialNumber?: true
    seatingCapacity?: true
    maximumRange?: true
    cruisingSpeed?: true
    baggageCapacity?: true
    condition?: true
    totalFlightHours?: true
    maintenanceHistory?: true
    lastInspection?: true
    salePrice?: true
    discounts?: true
    avionics?: true
    emergencyEquipment?: true
    cargoHook?: true
    videoLink?: true
    additionalEquipment?: true
    transactionSignature?: true
    transactionLink?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    endDate?: true
  }

  export type HelicopterForSaleListingCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    helicopterName?: true
    helicopterType?: true
    manufacturer?: true
    yearOfManufacture?: true
    registrationNumber?: true
    serialNumber?: true
    seatingCapacity?: true
    maximumRange?: true
    cruisingSpeed?: true
    baggageCapacity?: true
    condition?: true
    totalFlightHours?: true
    maintenanceHistory?: true
    lastInspection?: true
    salePrice?: true
    discounts?: true
    avionics?: true
    emergencyEquipment?: true
    cargoHook?: true
    videoLink?: true
    exteriorImageUrls?: true
    interiorImageUrls?: true
    additionalEquipment?: true
    transactionSignature?: true
    transactionLink?: true
    vendorId?: true
    views?: true
    status?: true
    sponsored?: true
    sponsoredType?: true
    endDate?: true
    _all?: true
  }

  export type HelicopterForSaleListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterForSaleListing to aggregate.
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForSaleListings to fetch.
     */
    orderBy?: HelicopterForSaleListingOrderByWithRelationInput | HelicopterForSaleListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HelicopterForSaleListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForSaleListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForSaleListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HelicopterForSaleListings
    **/
    _count?: true | HelicopterForSaleListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HelicopterForSaleListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HelicopterForSaleListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HelicopterForSaleListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HelicopterForSaleListingMaxAggregateInputType
  }

  export type GetHelicopterForSaleListingAggregateType<T extends HelicopterForSaleListingAggregateArgs> = {
        [P in keyof T & keyof AggregateHelicopterForSaleListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHelicopterForSaleListing[P]>
      : GetScalarType<T[P], AggregateHelicopterForSaleListing[P]>
  }




  export type HelicopterForSaleListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HelicopterForSaleListingWhereInput
    orderBy?: HelicopterForSaleListingOrderByWithAggregationInput | HelicopterForSaleListingOrderByWithAggregationInput[]
    by: HelicopterForSaleListingScalarFieldEnum[] | HelicopterForSaleListingScalarFieldEnum
    having?: HelicopterForSaleListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HelicopterForSaleListingCountAggregateInputType | true
    _avg?: HelicopterForSaleListingAvgAggregateInputType
    _sum?: HelicopterForSaleListingSumAggregateInputType
    _min?: HelicopterForSaleListingMinAggregateInputType
    _max?: HelicopterForSaleListingMaxAggregateInputType
  }

  export type HelicopterForSaleListingGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    helicopterName: string
    helicopterType: string
    manufacturer: string
    yearOfManufacture: number
    registrationNumber: string
    serialNumber: string
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: string
    condition: string
    totalFlightHours: number
    maintenanceHistory: string
    lastInspection: Date
    salePrice: number
    discounts: string | null
    avionics: string | null
    emergencyEquipment: boolean
    cargoHook: boolean
    videoLink: string | null
    exteriorImageUrls: string[]
    interiorImageUrls: string[]
    additionalEquipment: string | null
    transactionSignature: string
    transactionLink: string | null
    vendorId: string
    views: number
    status: string
    sponsored: boolean
    sponsoredType: string
    endDate: Date
    _count: HelicopterForSaleListingCountAggregateOutputType | null
    _avg: HelicopterForSaleListingAvgAggregateOutputType | null
    _sum: HelicopterForSaleListingSumAggregateOutputType | null
    _min: HelicopterForSaleListingMinAggregateOutputType | null
    _max: HelicopterForSaleListingMaxAggregateOutputType | null
  }

  type GetHelicopterForSaleListingGroupByPayload<T extends HelicopterForSaleListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HelicopterForSaleListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HelicopterForSaleListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HelicopterForSaleListingGroupByOutputType[P]>
            : GetScalarType<T[P], HelicopterForSaleListingGroupByOutputType[P]>
        }
      >
    >


  export type HelicopterForSaleListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    helicopterName?: boolean
    helicopterType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    serialNumber?: boolean
    seatingCapacity?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    condition?: boolean
    totalFlightHours?: boolean
    maintenanceHistory?: boolean
    lastInspection?: boolean
    salePrice?: boolean
    discounts?: boolean
    avionics?: boolean
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: boolean
    exteriorImageUrls?: boolean
    interiorImageUrls?: boolean
    additionalEquipment?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
    cabinFeatures?: boolean | HelicopterForSaleListing$cabinFeaturesArgs<ExtArgs>
    _count?: boolean | HelicopterForSaleListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["helicopterForSaleListing"]>

  export type HelicopterForSaleListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    helicopterName?: boolean
    helicopterType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    serialNumber?: boolean
    seatingCapacity?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    condition?: boolean
    totalFlightHours?: boolean
    maintenanceHistory?: boolean
    lastInspection?: boolean
    salePrice?: boolean
    discounts?: boolean
    avionics?: boolean
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: boolean
    exteriorImageUrls?: boolean
    interiorImageUrls?: boolean
    additionalEquipment?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }, ExtArgs["result"]["helicopterForSaleListing"]>

  export type HelicopterForSaleListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    helicopterName?: boolean
    helicopterType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    serialNumber?: boolean
    seatingCapacity?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    condition?: boolean
    totalFlightHours?: boolean
    maintenanceHistory?: boolean
    lastInspection?: boolean
    salePrice?: boolean
    discounts?: boolean
    avionics?: boolean
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: boolean
    exteriorImageUrls?: boolean
    interiorImageUrls?: boolean
    additionalEquipment?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }, ExtArgs["result"]["helicopterForSaleListing"]>

  export type HelicopterForSaleListingSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    helicopterName?: boolean
    helicopterType?: boolean
    manufacturer?: boolean
    yearOfManufacture?: boolean
    registrationNumber?: boolean
    serialNumber?: boolean
    seatingCapacity?: boolean
    maximumRange?: boolean
    cruisingSpeed?: boolean
    baggageCapacity?: boolean
    condition?: boolean
    totalFlightHours?: boolean
    maintenanceHistory?: boolean
    lastInspection?: boolean
    salePrice?: boolean
    discounts?: boolean
    avionics?: boolean
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: boolean
    exteriorImageUrls?: boolean
    interiorImageUrls?: boolean
    additionalEquipment?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    views?: boolean
    status?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }

  export type HelicopterForSaleListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "helicopterName" | "helicopterType" | "manufacturer" | "yearOfManufacture" | "registrationNumber" | "serialNumber" | "seatingCapacity" | "maximumRange" | "cruisingSpeed" | "baggageCapacity" | "condition" | "totalFlightHours" | "maintenanceHistory" | "lastInspection" | "salePrice" | "discounts" | "avionics" | "emergencyEquipment" | "cargoHook" | "videoLink" | "exteriorImageUrls" | "interiorImageUrls" | "additionalEquipment" | "transactionSignature" | "transactionLink" | "vendorId" | "views" | "status" | "sponsored" | "sponsoredType" | "endDate", ExtArgs["result"]["helicopterForSaleListing"]>
  export type HelicopterForSaleListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cabinFeatures?: boolean | HelicopterForSaleListing$cabinFeaturesArgs<ExtArgs>
    _count?: boolean | HelicopterForSaleListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HelicopterForSaleListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HelicopterForSaleListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HelicopterForSaleListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HelicopterForSaleListing"
    objects: {
      cabinFeatures: Prisma.$CabinFeaturePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      helicopterName: string
      helicopterType: string
      manufacturer: string
      yearOfManufacture: number
      registrationNumber: string
      serialNumber: string
      seatingCapacity: number
      maximumRange: number
      cruisingSpeed: number
      baggageCapacity: string
      condition: string
      totalFlightHours: number
      maintenanceHistory: string
      lastInspection: Date
      salePrice: number
      discounts: string | null
      avionics: string | null
      emergencyEquipment: boolean
      cargoHook: boolean
      videoLink: string | null
      exteriorImageUrls: string[]
      interiorImageUrls: string[]
      additionalEquipment: string | null
      transactionSignature: string
      transactionLink: string | null
      vendorId: string
      views: number
      status: string
      sponsored: boolean
      sponsoredType: string
      endDate: Date
    }, ExtArgs["result"]["helicopterForSaleListing"]>
    composites: {}
  }

  type HelicopterForSaleListingGetPayload<S extends boolean | null | undefined | HelicopterForSaleListingDefaultArgs> = $Result.GetResult<Prisma.$HelicopterForSaleListingPayload, S>

  type HelicopterForSaleListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HelicopterForSaleListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HelicopterForSaleListingCountAggregateInputType | true
    }

  export interface HelicopterForSaleListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HelicopterForSaleListing'], meta: { name: 'HelicopterForSaleListing' } }
    /**
     * Find zero or one HelicopterForSaleListing that matches the filter.
     * @param {HelicopterForSaleListingFindUniqueArgs} args - Arguments to find a HelicopterForSaleListing
     * @example
     * // Get one HelicopterForSaleListing
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HelicopterForSaleListingFindUniqueArgs>(args: SelectSubset<T, HelicopterForSaleListingFindUniqueArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HelicopterForSaleListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HelicopterForSaleListingFindUniqueOrThrowArgs} args - Arguments to find a HelicopterForSaleListing
     * @example
     * // Get one HelicopterForSaleListing
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HelicopterForSaleListingFindUniqueOrThrowArgs>(args: SelectSubset<T, HelicopterForSaleListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterForSaleListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingFindFirstArgs} args - Arguments to find a HelicopterForSaleListing
     * @example
     * // Get one HelicopterForSaleListing
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HelicopterForSaleListingFindFirstArgs>(args?: SelectSubset<T, HelicopterForSaleListingFindFirstArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterForSaleListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingFindFirstOrThrowArgs} args - Arguments to find a HelicopterForSaleListing
     * @example
     * // Get one HelicopterForSaleListing
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HelicopterForSaleListingFindFirstOrThrowArgs>(args?: SelectSubset<T, HelicopterForSaleListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HelicopterForSaleListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HelicopterForSaleListings
     * const helicopterForSaleListings = await prisma.helicopterForSaleListing.findMany()
     * 
     * // Get first 10 HelicopterForSaleListings
     * const helicopterForSaleListings = await prisma.helicopterForSaleListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const helicopterForSaleListingWithIdOnly = await prisma.helicopterForSaleListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HelicopterForSaleListingFindManyArgs>(args?: SelectSubset<T, HelicopterForSaleListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HelicopterForSaleListing.
     * @param {HelicopterForSaleListingCreateArgs} args - Arguments to create a HelicopterForSaleListing.
     * @example
     * // Create one HelicopterForSaleListing
     * const HelicopterForSaleListing = await prisma.helicopterForSaleListing.create({
     *   data: {
     *     // ... data to create a HelicopterForSaleListing
     *   }
     * })
     * 
     */
    create<T extends HelicopterForSaleListingCreateArgs>(args: SelectSubset<T, HelicopterForSaleListingCreateArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HelicopterForSaleListings.
     * @param {HelicopterForSaleListingCreateManyArgs} args - Arguments to create many HelicopterForSaleListings.
     * @example
     * // Create many HelicopterForSaleListings
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HelicopterForSaleListingCreateManyArgs>(args?: SelectSubset<T, HelicopterForSaleListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HelicopterForSaleListings and returns the data saved in the database.
     * @param {HelicopterForSaleListingCreateManyAndReturnArgs} args - Arguments to create many HelicopterForSaleListings.
     * @example
     * // Create many HelicopterForSaleListings
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HelicopterForSaleListings and only return the `id`
     * const helicopterForSaleListingWithIdOnly = await prisma.helicopterForSaleListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HelicopterForSaleListingCreateManyAndReturnArgs>(args?: SelectSubset<T, HelicopterForSaleListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HelicopterForSaleListing.
     * @param {HelicopterForSaleListingDeleteArgs} args - Arguments to delete one HelicopterForSaleListing.
     * @example
     * // Delete one HelicopterForSaleListing
     * const HelicopterForSaleListing = await prisma.helicopterForSaleListing.delete({
     *   where: {
     *     // ... filter to delete one HelicopterForSaleListing
     *   }
     * })
     * 
     */
    delete<T extends HelicopterForSaleListingDeleteArgs>(args: SelectSubset<T, HelicopterForSaleListingDeleteArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HelicopterForSaleListing.
     * @param {HelicopterForSaleListingUpdateArgs} args - Arguments to update one HelicopterForSaleListing.
     * @example
     * // Update one HelicopterForSaleListing
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HelicopterForSaleListingUpdateArgs>(args: SelectSubset<T, HelicopterForSaleListingUpdateArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HelicopterForSaleListings.
     * @param {HelicopterForSaleListingDeleteManyArgs} args - Arguments to filter HelicopterForSaleListings to delete.
     * @example
     * // Delete a few HelicopterForSaleListings
     * const { count } = await prisma.helicopterForSaleListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HelicopterForSaleListingDeleteManyArgs>(args?: SelectSubset<T, HelicopterForSaleListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterForSaleListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HelicopterForSaleListings
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HelicopterForSaleListingUpdateManyArgs>(args: SelectSubset<T, HelicopterForSaleListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterForSaleListings and returns the data updated in the database.
     * @param {HelicopterForSaleListingUpdateManyAndReturnArgs} args - Arguments to update many HelicopterForSaleListings.
     * @example
     * // Update many HelicopterForSaleListings
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HelicopterForSaleListings and only return the `id`
     * const helicopterForSaleListingWithIdOnly = await prisma.helicopterForSaleListing.updateManyAndReturn({
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
    updateManyAndReturn<T extends HelicopterForSaleListingUpdateManyAndReturnArgs>(args: SelectSubset<T, HelicopterForSaleListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HelicopterForSaleListing.
     * @param {HelicopterForSaleListingUpsertArgs} args - Arguments to update or create a HelicopterForSaleListing.
     * @example
     * // Update or create a HelicopterForSaleListing
     * const helicopterForSaleListing = await prisma.helicopterForSaleListing.upsert({
     *   create: {
     *     // ... data to create a HelicopterForSaleListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HelicopterForSaleListing we want to update
     *   }
     * })
     */
    upsert<T extends HelicopterForSaleListingUpsertArgs>(args: SelectSubset<T, HelicopterForSaleListingUpsertArgs<ExtArgs>>): Prisma__HelicopterForSaleListingClient<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HelicopterForSaleListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingCountArgs} args - Arguments to filter HelicopterForSaleListings to count.
     * @example
     * // Count the number of HelicopterForSaleListings
     * const count = await prisma.helicopterForSaleListing.count({
     *   where: {
     *     // ... the filter for the HelicopterForSaleListings we want to count
     *   }
     * })
    **/
    count<T extends HelicopterForSaleListingCountArgs>(
      args?: Subset<T, HelicopterForSaleListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HelicopterForSaleListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HelicopterForSaleListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HelicopterForSaleListingAggregateArgs>(args: Subset<T, HelicopterForSaleListingAggregateArgs>): Prisma.PrismaPromise<GetHelicopterForSaleListingAggregateType<T>>

    /**
     * Group by HelicopterForSaleListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForSaleListingGroupByArgs} args - Group by arguments.
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
      T extends HelicopterForSaleListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HelicopterForSaleListingGroupByArgs['orderBy'] }
        : { orderBy?: HelicopterForSaleListingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HelicopterForSaleListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHelicopterForSaleListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HelicopterForSaleListing model
   */
  readonly fields: HelicopterForSaleListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HelicopterForSaleListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HelicopterForSaleListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cabinFeatures<T extends HelicopterForSaleListing$cabinFeaturesArgs<ExtArgs> = {}>(args?: Subset<T, HelicopterForSaleListing$cabinFeaturesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the HelicopterForSaleListing model
   */
  interface HelicopterForSaleListingFieldRefs {
    readonly id: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly createdAt: FieldRef<"HelicopterForSaleListing", 'DateTime'>
    readonly updatedAt: FieldRef<"HelicopterForSaleListing", 'DateTime'>
    readonly helicopterName: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly helicopterType: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly manufacturer: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly yearOfManufacture: FieldRef<"HelicopterForSaleListing", 'Int'>
    readonly registrationNumber: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly serialNumber: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly seatingCapacity: FieldRef<"HelicopterForSaleListing", 'Int'>
    readonly maximumRange: FieldRef<"HelicopterForSaleListing", 'Float'>
    readonly cruisingSpeed: FieldRef<"HelicopterForSaleListing", 'Float'>
    readonly baggageCapacity: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly condition: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly totalFlightHours: FieldRef<"HelicopterForSaleListing", 'Float'>
    readonly maintenanceHistory: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly lastInspection: FieldRef<"HelicopterForSaleListing", 'DateTime'>
    readonly salePrice: FieldRef<"HelicopterForSaleListing", 'Float'>
    readonly discounts: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly avionics: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly emergencyEquipment: FieldRef<"HelicopterForSaleListing", 'Boolean'>
    readonly cargoHook: FieldRef<"HelicopterForSaleListing", 'Boolean'>
    readonly videoLink: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly exteriorImageUrls: FieldRef<"HelicopterForSaleListing", 'String[]'>
    readonly interiorImageUrls: FieldRef<"HelicopterForSaleListing", 'String[]'>
    readonly additionalEquipment: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly transactionSignature: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly transactionLink: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly vendorId: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly views: FieldRef<"HelicopterForSaleListing", 'Int'>
    readonly status: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly sponsored: FieldRef<"HelicopterForSaleListing", 'Boolean'>
    readonly sponsoredType: FieldRef<"HelicopterForSaleListing", 'String'>
    readonly endDate: FieldRef<"HelicopterForSaleListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HelicopterForSaleListing findUnique
   */
  export type HelicopterForSaleListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * Filter, which HelicopterForSaleListing to fetch.
     */
    where: HelicopterForSaleListingWhereUniqueInput
  }

  /**
   * HelicopterForSaleListing findUniqueOrThrow
   */
  export type HelicopterForSaleListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * Filter, which HelicopterForSaleListing to fetch.
     */
    where: HelicopterForSaleListingWhereUniqueInput
  }

  /**
   * HelicopterForSaleListing findFirst
   */
  export type HelicopterForSaleListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * Filter, which HelicopterForSaleListing to fetch.
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForSaleListings to fetch.
     */
    orderBy?: HelicopterForSaleListingOrderByWithRelationInput | HelicopterForSaleListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterForSaleListings.
     */
    cursor?: HelicopterForSaleListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForSaleListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForSaleListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterForSaleListings.
     */
    distinct?: HelicopterForSaleListingScalarFieldEnum | HelicopterForSaleListingScalarFieldEnum[]
  }

  /**
   * HelicopterForSaleListing findFirstOrThrow
   */
  export type HelicopterForSaleListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * Filter, which HelicopterForSaleListing to fetch.
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForSaleListings to fetch.
     */
    orderBy?: HelicopterForSaleListingOrderByWithRelationInput | HelicopterForSaleListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterForSaleListings.
     */
    cursor?: HelicopterForSaleListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForSaleListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForSaleListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterForSaleListings.
     */
    distinct?: HelicopterForSaleListingScalarFieldEnum | HelicopterForSaleListingScalarFieldEnum[]
  }

  /**
   * HelicopterForSaleListing findMany
   */
  export type HelicopterForSaleListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * Filter, which HelicopterForSaleListings to fetch.
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForSaleListings to fetch.
     */
    orderBy?: HelicopterForSaleListingOrderByWithRelationInput | HelicopterForSaleListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HelicopterForSaleListings.
     */
    cursor?: HelicopterForSaleListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForSaleListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForSaleListings.
     */
    skip?: number
    distinct?: HelicopterForSaleListingScalarFieldEnum | HelicopterForSaleListingScalarFieldEnum[]
  }

  /**
   * HelicopterForSaleListing create
   */
  export type HelicopterForSaleListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * The data needed to create a HelicopterForSaleListing.
     */
    data: XOR<HelicopterForSaleListingCreateInput, HelicopterForSaleListingUncheckedCreateInput>
  }

  /**
   * HelicopterForSaleListing createMany
   */
  export type HelicopterForSaleListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HelicopterForSaleListings.
     */
    data: HelicopterForSaleListingCreateManyInput | HelicopterForSaleListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterForSaleListing createManyAndReturn
   */
  export type HelicopterForSaleListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * The data used to create many HelicopterForSaleListings.
     */
    data: HelicopterForSaleListingCreateManyInput | HelicopterForSaleListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterForSaleListing update
   */
  export type HelicopterForSaleListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * The data needed to update a HelicopterForSaleListing.
     */
    data: XOR<HelicopterForSaleListingUpdateInput, HelicopterForSaleListingUncheckedUpdateInput>
    /**
     * Choose, which HelicopterForSaleListing to update.
     */
    where: HelicopterForSaleListingWhereUniqueInput
  }

  /**
   * HelicopterForSaleListing updateMany
   */
  export type HelicopterForSaleListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HelicopterForSaleListings.
     */
    data: XOR<HelicopterForSaleListingUpdateManyMutationInput, HelicopterForSaleListingUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterForSaleListings to update
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * Limit how many HelicopterForSaleListings to update.
     */
    limit?: number
  }

  /**
   * HelicopterForSaleListing updateManyAndReturn
   */
  export type HelicopterForSaleListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * The data used to update HelicopterForSaleListings.
     */
    data: XOR<HelicopterForSaleListingUpdateManyMutationInput, HelicopterForSaleListingUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterForSaleListings to update
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * Limit how many HelicopterForSaleListings to update.
     */
    limit?: number
  }

  /**
   * HelicopterForSaleListing upsert
   */
  export type HelicopterForSaleListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * The filter to search for the HelicopterForSaleListing to update in case it exists.
     */
    where: HelicopterForSaleListingWhereUniqueInput
    /**
     * In case the HelicopterForSaleListing found by the `where` argument doesn't exist, create a new HelicopterForSaleListing with this data.
     */
    create: XOR<HelicopterForSaleListingCreateInput, HelicopterForSaleListingUncheckedCreateInput>
    /**
     * In case the HelicopterForSaleListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HelicopterForSaleListingUpdateInput, HelicopterForSaleListingUncheckedUpdateInput>
  }

  /**
   * HelicopterForSaleListing delete
   */
  export type HelicopterForSaleListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    /**
     * Filter which HelicopterForSaleListing to delete.
     */
    where: HelicopterForSaleListingWhereUniqueInput
  }

  /**
   * HelicopterForSaleListing deleteMany
   */
  export type HelicopterForSaleListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterForSaleListings to delete
     */
    where?: HelicopterForSaleListingWhereInput
    /**
     * Limit how many HelicopterForSaleListings to delete.
     */
    limit?: number
  }

  /**
   * HelicopterForSaleListing.cabinFeatures
   */
  export type HelicopterForSaleListing$cabinFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    where?: CabinFeatureWhereInput
    orderBy?: CabinFeatureOrderByWithRelationInput | CabinFeatureOrderByWithRelationInput[]
    cursor?: CabinFeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CabinFeatureScalarFieldEnum | CabinFeatureScalarFieldEnum[]
  }

  /**
   * HelicopterForSaleListing without action
   */
  export type HelicopterForSaleListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
  }


  /**
   * Model CabinFeature
   */

  export type AggregateCabinFeature = {
    _count: CabinFeatureCountAggregateOutputType | null
    _min: CabinFeatureMinAggregateOutputType | null
    _max: CabinFeatureMaxAggregateOutputType | null
  }

  export type CabinFeatureMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type CabinFeatureMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
  }

  export type CabinFeatureCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    _all: number
  }


  export type CabinFeatureMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type CabinFeatureMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
  }

  export type CabinFeatureCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    _all?: true
  }

  export type CabinFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CabinFeature to aggregate.
     */
    where?: CabinFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinFeatures to fetch.
     */
    orderBy?: CabinFeatureOrderByWithRelationInput | CabinFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CabinFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CabinFeatures
    **/
    _count?: true | CabinFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CabinFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CabinFeatureMaxAggregateInputType
  }

  export type GetCabinFeatureAggregateType<T extends CabinFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregateCabinFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCabinFeature[P]>
      : GetScalarType<T[P], AggregateCabinFeature[P]>
  }




  export type CabinFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CabinFeatureWhereInput
    orderBy?: CabinFeatureOrderByWithAggregationInput | CabinFeatureOrderByWithAggregationInput[]
    by: CabinFeatureScalarFieldEnum[] | CabinFeatureScalarFieldEnum
    having?: CabinFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CabinFeatureCountAggregateInputType | true
    _min?: CabinFeatureMinAggregateInputType
    _max?: CabinFeatureMaxAggregateInputType
  }

  export type CabinFeatureGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    _count: CabinFeatureCountAggregateOutputType | null
    _min: CabinFeatureMinAggregateOutputType | null
    _max: CabinFeatureMaxAggregateOutputType | null
  }

  type GetCabinFeatureGroupByPayload<T extends CabinFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CabinFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CabinFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CabinFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], CabinFeatureGroupByOutputType[P]>
        }
      >
    >


  export type CabinFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    helicopters?: boolean | CabinFeature$helicoptersArgs<ExtArgs>
    _count?: boolean | CabinFeatureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cabinFeature"]>

  export type CabinFeatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }, ExtArgs["result"]["cabinFeature"]>

  export type CabinFeatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }, ExtArgs["result"]["cabinFeature"]>

  export type CabinFeatureSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
  }

  export type CabinFeatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name", ExtArgs["result"]["cabinFeature"]>
  export type CabinFeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    helicopters?: boolean | CabinFeature$helicoptersArgs<ExtArgs>
    _count?: boolean | CabinFeatureCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CabinFeatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CabinFeatureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CabinFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CabinFeature"
    objects: {
      helicopters: Prisma.$HelicopterForSaleListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
    }, ExtArgs["result"]["cabinFeature"]>
    composites: {}
  }

  type CabinFeatureGetPayload<S extends boolean | null | undefined | CabinFeatureDefaultArgs> = $Result.GetResult<Prisma.$CabinFeaturePayload, S>

  type CabinFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CabinFeatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CabinFeatureCountAggregateInputType | true
    }

  export interface CabinFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CabinFeature'], meta: { name: 'CabinFeature' } }
    /**
     * Find zero or one CabinFeature that matches the filter.
     * @param {CabinFeatureFindUniqueArgs} args - Arguments to find a CabinFeature
     * @example
     * // Get one CabinFeature
     * const cabinFeature = await prisma.cabinFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CabinFeatureFindUniqueArgs>(args: SelectSubset<T, CabinFeatureFindUniqueArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CabinFeature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CabinFeatureFindUniqueOrThrowArgs} args - Arguments to find a CabinFeature
     * @example
     * // Get one CabinFeature
     * const cabinFeature = await prisma.cabinFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CabinFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, CabinFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CabinFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureFindFirstArgs} args - Arguments to find a CabinFeature
     * @example
     * // Get one CabinFeature
     * const cabinFeature = await prisma.cabinFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CabinFeatureFindFirstArgs>(args?: SelectSubset<T, CabinFeatureFindFirstArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CabinFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureFindFirstOrThrowArgs} args - Arguments to find a CabinFeature
     * @example
     * // Get one CabinFeature
     * const cabinFeature = await prisma.cabinFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CabinFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, CabinFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CabinFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CabinFeatures
     * const cabinFeatures = await prisma.cabinFeature.findMany()
     * 
     * // Get first 10 CabinFeatures
     * const cabinFeatures = await prisma.cabinFeature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cabinFeatureWithIdOnly = await prisma.cabinFeature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CabinFeatureFindManyArgs>(args?: SelectSubset<T, CabinFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CabinFeature.
     * @param {CabinFeatureCreateArgs} args - Arguments to create a CabinFeature.
     * @example
     * // Create one CabinFeature
     * const CabinFeature = await prisma.cabinFeature.create({
     *   data: {
     *     // ... data to create a CabinFeature
     *   }
     * })
     * 
     */
    create<T extends CabinFeatureCreateArgs>(args: SelectSubset<T, CabinFeatureCreateArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CabinFeatures.
     * @param {CabinFeatureCreateManyArgs} args - Arguments to create many CabinFeatures.
     * @example
     * // Create many CabinFeatures
     * const cabinFeature = await prisma.cabinFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CabinFeatureCreateManyArgs>(args?: SelectSubset<T, CabinFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CabinFeatures and returns the data saved in the database.
     * @param {CabinFeatureCreateManyAndReturnArgs} args - Arguments to create many CabinFeatures.
     * @example
     * // Create many CabinFeatures
     * const cabinFeature = await prisma.cabinFeature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CabinFeatures and only return the `id`
     * const cabinFeatureWithIdOnly = await prisma.cabinFeature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CabinFeatureCreateManyAndReturnArgs>(args?: SelectSubset<T, CabinFeatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CabinFeature.
     * @param {CabinFeatureDeleteArgs} args - Arguments to delete one CabinFeature.
     * @example
     * // Delete one CabinFeature
     * const CabinFeature = await prisma.cabinFeature.delete({
     *   where: {
     *     // ... filter to delete one CabinFeature
     *   }
     * })
     * 
     */
    delete<T extends CabinFeatureDeleteArgs>(args: SelectSubset<T, CabinFeatureDeleteArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CabinFeature.
     * @param {CabinFeatureUpdateArgs} args - Arguments to update one CabinFeature.
     * @example
     * // Update one CabinFeature
     * const cabinFeature = await prisma.cabinFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CabinFeatureUpdateArgs>(args: SelectSubset<T, CabinFeatureUpdateArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CabinFeatures.
     * @param {CabinFeatureDeleteManyArgs} args - Arguments to filter CabinFeatures to delete.
     * @example
     * // Delete a few CabinFeatures
     * const { count } = await prisma.cabinFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CabinFeatureDeleteManyArgs>(args?: SelectSubset<T, CabinFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CabinFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CabinFeatures
     * const cabinFeature = await prisma.cabinFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CabinFeatureUpdateManyArgs>(args: SelectSubset<T, CabinFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CabinFeatures and returns the data updated in the database.
     * @param {CabinFeatureUpdateManyAndReturnArgs} args - Arguments to update many CabinFeatures.
     * @example
     * // Update many CabinFeatures
     * const cabinFeature = await prisma.cabinFeature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CabinFeatures and only return the `id`
     * const cabinFeatureWithIdOnly = await prisma.cabinFeature.updateManyAndReturn({
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
    updateManyAndReturn<T extends CabinFeatureUpdateManyAndReturnArgs>(args: SelectSubset<T, CabinFeatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CabinFeature.
     * @param {CabinFeatureUpsertArgs} args - Arguments to update or create a CabinFeature.
     * @example
     * // Update or create a CabinFeature
     * const cabinFeature = await prisma.cabinFeature.upsert({
     *   create: {
     *     // ... data to create a CabinFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CabinFeature we want to update
     *   }
     * })
     */
    upsert<T extends CabinFeatureUpsertArgs>(args: SelectSubset<T, CabinFeatureUpsertArgs<ExtArgs>>): Prisma__CabinFeatureClient<$Result.GetResult<Prisma.$CabinFeaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CabinFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureCountArgs} args - Arguments to filter CabinFeatures to count.
     * @example
     * // Count the number of CabinFeatures
     * const count = await prisma.cabinFeature.count({
     *   where: {
     *     // ... the filter for the CabinFeatures we want to count
     *   }
     * })
    **/
    count<T extends CabinFeatureCountArgs>(
      args?: Subset<T, CabinFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CabinFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CabinFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CabinFeatureAggregateArgs>(args: Subset<T, CabinFeatureAggregateArgs>): Prisma.PrismaPromise<GetCabinFeatureAggregateType<T>>

    /**
     * Group by CabinFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CabinFeatureGroupByArgs} args - Group by arguments.
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
      T extends CabinFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CabinFeatureGroupByArgs['orderBy'] }
        : { orderBy?: CabinFeatureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CabinFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCabinFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CabinFeature model
   */
  readonly fields: CabinFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CabinFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CabinFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    helicopters<T extends CabinFeature$helicoptersArgs<ExtArgs> = {}>(args?: Subset<T, CabinFeature$helicoptersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForSaleListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CabinFeature model
   */
  interface CabinFeatureFieldRefs {
    readonly id: FieldRef<"CabinFeature", 'String'>
    readonly createdAt: FieldRef<"CabinFeature", 'DateTime'>
    readonly updatedAt: FieldRef<"CabinFeature", 'DateTime'>
    readonly name: FieldRef<"CabinFeature", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CabinFeature findUnique
   */
  export type CabinFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * Filter, which CabinFeature to fetch.
     */
    where: CabinFeatureWhereUniqueInput
  }

  /**
   * CabinFeature findUniqueOrThrow
   */
  export type CabinFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * Filter, which CabinFeature to fetch.
     */
    where: CabinFeatureWhereUniqueInput
  }

  /**
   * CabinFeature findFirst
   */
  export type CabinFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * Filter, which CabinFeature to fetch.
     */
    where?: CabinFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinFeatures to fetch.
     */
    orderBy?: CabinFeatureOrderByWithRelationInput | CabinFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CabinFeatures.
     */
    cursor?: CabinFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CabinFeatures.
     */
    distinct?: CabinFeatureScalarFieldEnum | CabinFeatureScalarFieldEnum[]
  }

  /**
   * CabinFeature findFirstOrThrow
   */
  export type CabinFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * Filter, which CabinFeature to fetch.
     */
    where?: CabinFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinFeatures to fetch.
     */
    orderBy?: CabinFeatureOrderByWithRelationInput | CabinFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CabinFeatures.
     */
    cursor?: CabinFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CabinFeatures.
     */
    distinct?: CabinFeatureScalarFieldEnum | CabinFeatureScalarFieldEnum[]
  }

  /**
   * CabinFeature findMany
   */
  export type CabinFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * Filter, which CabinFeatures to fetch.
     */
    where?: CabinFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CabinFeatures to fetch.
     */
    orderBy?: CabinFeatureOrderByWithRelationInput | CabinFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CabinFeatures.
     */
    cursor?: CabinFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CabinFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CabinFeatures.
     */
    skip?: number
    distinct?: CabinFeatureScalarFieldEnum | CabinFeatureScalarFieldEnum[]
  }

  /**
   * CabinFeature create
   */
  export type CabinFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a CabinFeature.
     */
    data: XOR<CabinFeatureCreateInput, CabinFeatureUncheckedCreateInput>
  }

  /**
   * CabinFeature createMany
   */
  export type CabinFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CabinFeatures.
     */
    data: CabinFeatureCreateManyInput | CabinFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CabinFeature createManyAndReturn
   */
  export type CabinFeatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * The data used to create many CabinFeatures.
     */
    data: CabinFeatureCreateManyInput | CabinFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CabinFeature update
   */
  export type CabinFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a CabinFeature.
     */
    data: XOR<CabinFeatureUpdateInput, CabinFeatureUncheckedUpdateInput>
    /**
     * Choose, which CabinFeature to update.
     */
    where: CabinFeatureWhereUniqueInput
  }

  /**
   * CabinFeature updateMany
   */
  export type CabinFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CabinFeatures.
     */
    data: XOR<CabinFeatureUpdateManyMutationInput, CabinFeatureUncheckedUpdateManyInput>
    /**
     * Filter which CabinFeatures to update
     */
    where?: CabinFeatureWhereInput
    /**
     * Limit how many CabinFeatures to update.
     */
    limit?: number
  }

  /**
   * CabinFeature updateManyAndReturn
   */
  export type CabinFeatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * The data used to update CabinFeatures.
     */
    data: XOR<CabinFeatureUpdateManyMutationInput, CabinFeatureUncheckedUpdateManyInput>
    /**
     * Filter which CabinFeatures to update
     */
    where?: CabinFeatureWhereInput
    /**
     * Limit how many CabinFeatures to update.
     */
    limit?: number
  }

  /**
   * CabinFeature upsert
   */
  export type CabinFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the CabinFeature to update in case it exists.
     */
    where: CabinFeatureWhereUniqueInput
    /**
     * In case the CabinFeature found by the `where` argument doesn't exist, create a new CabinFeature with this data.
     */
    create: XOR<CabinFeatureCreateInput, CabinFeatureUncheckedCreateInput>
    /**
     * In case the CabinFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CabinFeatureUpdateInput, CabinFeatureUncheckedUpdateInput>
  }

  /**
   * CabinFeature delete
   */
  export type CabinFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
    /**
     * Filter which CabinFeature to delete.
     */
    where: CabinFeatureWhereUniqueInput
  }

  /**
   * CabinFeature deleteMany
   */
  export type CabinFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CabinFeatures to delete
     */
    where?: CabinFeatureWhereInput
    /**
     * Limit how many CabinFeatures to delete.
     */
    limit?: number
  }

  /**
   * CabinFeature.helicopters
   */
  export type CabinFeature$helicoptersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForSaleListing
     */
    select?: HelicopterForSaleListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForSaleListing
     */
    omit?: HelicopterForSaleListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HelicopterForSaleListingInclude<ExtArgs> | null
    where?: HelicopterForSaleListingWhereInput
    orderBy?: HelicopterForSaleListingOrderByWithRelationInput | HelicopterForSaleListingOrderByWithRelationInput[]
    cursor?: HelicopterForSaleListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HelicopterForSaleListingScalarFieldEnum | HelicopterForSaleListingScalarFieldEnum[]
  }

  /**
   * CabinFeature without action
   */
  export type CabinFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CabinFeature
     */
    select?: CabinFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CabinFeature
     */
    omit?: CabinFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CabinFeatureInclude<ExtArgs> | null
  }


  /**
   * Model HelicopterMessage
   */

  export type AggregateHelicopterMessage = {
    _count: HelicopterMessageCountAggregateOutputType | null
    _min: HelicopterMessageMinAggregateOutputType | null
    _max: HelicopterMessageMaxAggregateOutputType | null
  }

  export type HelicopterMessageMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    listingId: string | null
    vendorId: string | null
    message: string | null
    read: boolean | null
  }

  export type HelicopterMessageMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    listingId: string | null
    vendorId: string | null
    message: string | null
    read: boolean | null
  }

  export type HelicopterMessageCountAggregateOutputType = {
    id: number
    createdAt: number
    customerName: number
    customerEmail: number
    customerCountry: number
    listingId: number
    vendorId: number
    message: number
    read: number
    _all: number
  }


  export type HelicopterMessageMinAggregateInputType = {
    id?: true
    createdAt?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    listingId?: true
    vendorId?: true
    message?: true
    read?: true
  }

  export type HelicopterMessageMaxAggregateInputType = {
    id?: true
    createdAt?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    listingId?: true
    vendorId?: true
    message?: true
    read?: true
  }

  export type HelicopterMessageCountAggregateInputType = {
    id?: true
    createdAt?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    listingId?: true
    vendorId?: true
    message?: true
    read?: true
    _all?: true
  }

  export type HelicopterMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterMessage to aggregate.
     */
    where?: HelicopterMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterMessages to fetch.
     */
    orderBy?: HelicopterMessageOrderByWithRelationInput | HelicopterMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HelicopterMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HelicopterMessages
    **/
    _count?: true | HelicopterMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HelicopterMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HelicopterMessageMaxAggregateInputType
  }

  export type GetHelicopterMessageAggregateType<T extends HelicopterMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateHelicopterMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHelicopterMessage[P]>
      : GetScalarType<T[P], AggregateHelicopterMessage[P]>
  }




  export type HelicopterMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HelicopterMessageWhereInput
    orderBy?: HelicopterMessageOrderByWithAggregationInput | HelicopterMessageOrderByWithAggregationInput[]
    by: HelicopterMessageScalarFieldEnum[] | HelicopterMessageScalarFieldEnum
    having?: HelicopterMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HelicopterMessageCountAggregateInputType | true
    _min?: HelicopterMessageMinAggregateInputType
    _max?: HelicopterMessageMaxAggregateInputType
  }

  export type HelicopterMessageGroupByOutputType = {
    id: string
    createdAt: Date
    customerName: string
    customerEmail: string
    customerCountry: string | null
    listingId: string
    vendorId: string
    message: string
    read: boolean
    _count: HelicopterMessageCountAggregateOutputType | null
    _min: HelicopterMessageMinAggregateOutputType | null
    _max: HelicopterMessageMaxAggregateOutputType | null
  }

  type GetHelicopterMessageGroupByPayload<T extends HelicopterMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HelicopterMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HelicopterMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HelicopterMessageGroupByOutputType[P]>
            : GetScalarType<T[P], HelicopterMessageGroupByOutputType[P]>
        }
      >
    >


  export type HelicopterMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    read?: boolean
  }, ExtArgs["result"]["helicopterMessage"]>

  export type HelicopterMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    read?: boolean
  }, ExtArgs["result"]["helicopterMessage"]>

  export type HelicopterMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    read?: boolean
  }, ExtArgs["result"]["helicopterMessage"]>

  export type HelicopterMessageSelectScalar = {
    id?: boolean
    createdAt?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    listingId?: boolean
    vendorId?: boolean
    message?: boolean
    read?: boolean
  }

  export type HelicopterMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "customerName" | "customerEmail" | "customerCountry" | "listingId" | "vendorId" | "message" | "read", ExtArgs["result"]["helicopterMessage"]>

  export type $HelicopterMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HelicopterMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      customerName: string
      customerEmail: string
      customerCountry: string | null
      listingId: string
      vendorId: string
      message: string
      read: boolean
    }, ExtArgs["result"]["helicopterMessage"]>
    composites: {}
  }

  type HelicopterMessageGetPayload<S extends boolean | null | undefined | HelicopterMessageDefaultArgs> = $Result.GetResult<Prisma.$HelicopterMessagePayload, S>

  type HelicopterMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HelicopterMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HelicopterMessageCountAggregateInputType | true
    }

  export interface HelicopterMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HelicopterMessage'], meta: { name: 'HelicopterMessage' } }
    /**
     * Find zero or one HelicopterMessage that matches the filter.
     * @param {HelicopterMessageFindUniqueArgs} args - Arguments to find a HelicopterMessage
     * @example
     * // Get one HelicopterMessage
     * const helicopterMessage = await prisma.helicopterMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HelicopterMessageFindUniqueArgs>(args: SelectSubset<T, HelicopterMessageFindUniqueArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HelicopterMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HelicopterMessageFindUniqueOrThrowArgs} args - Arguments to find a HelicopterMessage
     * @example
     * // Get one HelicopterMessage
     * const helicopterMessage = await prisma.helicopterMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HelicopterMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, HelicopterMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageFindFirstArgs} args - Arguments to find a HelicopterMessage
     * @example
     * // Get one HelicopterMessage
     * const helicopterMessage = await prisma.helicopterMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HelicopterMessageFindFirstArgs>(args?: SelectSubset<T, HelicopterMessageFindFirstArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageFindFirstOrThrowArgs} args - Arguments to find a HelicopterMessage
     * @example
     * // Get one HelicopterMessage
     * const helicopterMessage = await prisma.helicopterMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HelicopterMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, HelicopterMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HelicopterMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HelicopterMessages
     * const helicopterMessages = await prisma.helicopterMessage.findMany()
     * 
     * // Get first 10 HelicopterMessages
     * const helicopterMessages = await prisma.helicopterMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const helicopterMessageWithIdOnly = await prisma.helicopterMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HelicopterMessageFindManyArgs>(args?: SelectSubset<T, HelicopterMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HelicopterMessage.
     * @param {HelicopterMessageCreateArgs} args - Arguments to create a HelicopterMessage.
     * @example
     * // Create one HelicopterMessage
     * const HelicopterMessage = await prisma.helicopterMessage.create({
     *   data: {
     *     // ... data to create a HelicopterMessage
     *   }
     * })
     * 
     */
    create<T extends HelicopterMessageCreateArgs>(args: SelectSubset<T, HelicopterMessageCreateArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HelicopterMessages.
     * @param {HelicopterMessageCreateManyArgs} args - Arguments to create many HelicopterMessages.
     * @example
     * // Create many HelicopterMessages
     * const helicopterMessage = await prisma.helicopterMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HelicopterMessageCreateManyArgs>(args?: SelectSubset<T, HelicopterMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HelicopterMessages and returns the data saved in the database.
     * @param {HelicopterMessageCreateManyAndReturnArgs} args - Arguments to create many HelicopterMessages.
     * @example
     * // Create many HelicopterMessages
     * const helicopterMessage = await prisma.helicopterMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HelicopterMessages and only return the `id`
     * const helicopterMessageWithIdOnly = await prisma.helicopterMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HelicopterMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, HelicopterMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HelicopterMessage.
     * @param {HelicopterMessageDeleteArgs} args - Arguments to delete one HelicopterMessage.
     * @example
     * // Delete one HelicopterMessage
     * const HelicopterMessage = await prisma.helicopterMessage.delete({
     *   where: {
     *     // ... filter to delete one HelicopterMessage
     *   }
     * })
     * 
     */
    delete<T extends HelicopterMessageDeleteArgs>(args: SelectSubset<T, HelicopterMessageDeleteArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HelicopterMessage.
     * @param {HelicopterMessageUpdateArgs} args - Arguments to update one HelicopterMessage.
     * @example
     * // Update one HelicopterMessage
     * const helicopterMessage = await prisma.helicopterMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HelicopterMessageUpdateArgs>(args: SelectSubset<T, HelicopterMessageUpdateArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HelicopterMessages.
     * @param {HelicopterMessageDeleteManyArgs} args - Arguments to filter HelicopterMessages to delete.
     * @example
     * // Delete a few HelicopterMessages
     * const { count } = await prisma.helicopterMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HelicopterMessageDeleteManyArgs>(args?: SelectSubset<T, HelicopterMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HelicopterMessages
     * const helicopterMessage = await prisma.helicopterMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HelicopterMessageUpdateManyArgs>(args: SelectSubset<T, HelicopterMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterMessages and returns the data updated in the database.
     * @param {HelicopterMessageUpdateManyAndReturnArgs} args - Arguments to update many HelicopterMessages.
     * @example
     * // Update many HelicopterMessages
     * const helicopterMessage = await prisma.helicopterMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HelicopterMessages and only return the `id`
     * const helicopterMessageWithIdOnly = await prisma.helicopterMessage.updateManyAndReturn({
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
    updateManyAndReturn<T extends HelicopterMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, HelicopterMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HelicopterMessage.
     * @param {HelicopterMessageUpsertArgs} args - Arguments to update or create a HelicopterMessage.
     * @example
     * // Update or create a HelicopterMessage
     * const helicopterMessage = await prisma.helicopterMessage.upsert({
     *   create: {
     *     // ... data to create a HelicopterMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HelicopterMessage we want to update
     *   }
     * })
     */
    upsert<T extends HelicopterMessageUpsertArgs>(args: SelectSubset<T, HelicopterMessageUpsertArgs<ExtArgs>>): Prisma__HelicopterMessageClient<$Result.GetResult<Prisma.$HelicopterMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HelicopterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageCountArgs} args - Arguments to filter HelicopterMessages to count.
     * @example
     * // Count the number of HelicopterMessages
     * const count = await prisma.helicopterMessage.count({
     *   where: {
     *     // ... the filter for the HelicopterMessages we want to count
     *   }
     * })
    **/
    count<T extends HelicopterMessageCountArgs>(
      args?: Subset<T, HelicopterMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HelicopterMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HelicopterMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HelicopterMessageAggregateArgs>(args: Subset<T, HelicopterMessageAggregateArgs>): Prisma.PrismaPromise<GetHelicopterMessageAggregateType<T>>

    /**
     * Group by HelicopterMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterMessageGroupByArgs} args - Group by arguments.
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
      T extends HelicopterMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HelicopterMessageGroupByArgs['orderBy'] }
        : { orderBy?: HelicopterMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HelicopterMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHelicopterMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HelicopterMessage model
   */
  readonly fields: HelicopterMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HelicopterMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HelicopterMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the HelicopterMessage model
   */
  interface HelicopterMessageFieldRefs {
    readonly id: FieldRef<"HelicopterMessage", 'String'>
    readonly createdAt: FieldRef<"HelicopterMessage", 'DateTime'>
    readonly customerName: FieldRef<"HelicopterMessage", 'String'>
    readonly customerEmail: FieldRef<"HelicopterMessage", 'String'>
    readonly customerCountry: FieldRef<"HelicopterMessage", 'String'>
    readonly listingId: FieldRef<"HelicopterMessage", 'String'>
    readonly vendorId: FieldRef<"HelicopterMessage", 'String'>
    readonly message: FieldRef<"HelicopterMessage", 'String'>
    readonly read: FieldRef<"HelicopterMessage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * HelicopterMessage findUnique
   */
  export type HelicopterMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterMessage to fetch.
     */
    where: HelicopterMessageWhereUniqueInput
  }

  /**
   * HelicopterMessage findUniqueOrThrow
   */
  export type HelicopterMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterMessage to fetch.
     */
    where: HelicopterMessageWhereUniqueInput
  }

  /**
   * HelicopterMessage findFirst
   */
  export type HelicopterMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterMessage to fetch.
     */
    where?: HelicopterMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterMessages to fetch.
     */
    orderBy?: HelicopterMessageOrderByWithRelationInput | HelicopterMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterMessages.
     */
    cursor?: HelicopterMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterMessages.
     */
    distinct?: HelicopterMessageScalarFieldEnum | HelicopterMessageScalarFieldEnum[]
  }

  /**
   * HelicopterMessage findFirstOrThrow
   */
  export type HelicopterMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterMessage to fetch.
     */
    where?: HelicopterMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterMessages to fetch.
     */
    orderBy?: HelicopterMessageOrderByWithRelationInput | HelicopterMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterMessages.
     */
    cursor?: HelicopterMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterMessages.
     */
    distinct?: HelicopterMessageScalarFieldEnum | HelicopterMessageScalarFieldEnum[]
  }

  /**
   * HelicopterMessage findMany
   */
  export type HelicopterMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterMessages to fetch.
     */
    where?: HelicopterMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterMessages to fetch.
     */
    orderBy?: HelicopterMessageOrderByWithRelationInput | HelicopterMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HelicopterMessages.
     */
    cursor?: HelicopterMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterMessages.
     */
    skip?: number
    distinct?: HelicopterMessageScalarFieldEnum | HelicopterMessageScalarFieldEnum[]
  }

  /**
   * HelicopterMessage create
   */
  export type HelicopterMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a HelicopterMessage.
     */
    data: XOR<HelicopterMessageCreateInput, HelicopterMessageUncheckedCreateInput>
  }

  /**
   * HelicopterMessage createMany
   */
  export type HelicopterMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HelicopterMessages.
     */
    data: HelicopterMessageCreateManyInput | HelicopterMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterMessage createManyAndReturn
   */
  export type HelicopterMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * The data used to create many HelicopterMessages.
     */
    data: HelicopterMessageCreateManyInput | HelicopterMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterMessage update
   */
  export type HelicopterMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a HelicopterMessage.
     */
    data: XOR<HelicopterMessageUpdateInput, HelicopterMessageUncheckedUpdateInput>
    /**
     * Choose, which HelicopterMessage to update.
     */
    where: HelicopterMessageWhereUniqueInput
  }

  /**
   * HelicopterMessage updateMany
   */
  export type HelicopterMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HelicopterMessages.
     */
    data: XOR<HelicopterMessageUpdateManyMutationInput, HelicopterMessageUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterMessages to update
     */
    where?: HelicopterMessageWhereInput
    /**
     * Limit how many HelicopterMessages to update.
     */
    limit?: number
  }

  /**
   * HelicopterMessage updateManyAndReturn
   */
  export type HelicopterMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * The data used to update HelicopterMessages.
     */
    data: XOR<HelicopterMessageUpdateManyMutationInput, HelicopterMessageUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterMessages to update
     */
    where?: HelicopterMessageWhereInput
    /**
     * Limit how many HelicopterMessages to update.
     */
    limit?: number
  }

  /**
   * HelicopterMessage upsert
   */
  export type HelicopterMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the HelicopterMessage to update in case it exists.
     */
    where: HelicopterMessageWhereUniqueInput
    /**
     * In case the HelicopterMessage found by the `where` argument doesn't exist, create a new HelicopterMessage with this data.
     */
    create: XOR<HelicopterMessageCreateInput, HelicopterMessageUncheckedCreateInput>
    /**
     * In case the HelicopterMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HelicopterMessageUpdateInput, HelicopterMessageUncheckedUpdateInput>
  }

  /**
   * HelicopterMessage delete
   */
  export type HelicopterMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
    /**
     * Filter which HelicopterMessage to delete.
     */
    where: HelicopterMessageWhereUniqueInput
  }

  /**
   * HelicopterMessage deleteMany
   */
  export type HelicopterMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterMessages to delete
     */
    where?: HelicopterMessageWhereInput
    /**
     * Limit how many HelicopterMessages to delete.
     */
    limit?: number
  }

  /**
   * HelicopterMessage without action
   */
  export type HelicopterMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterMessage
     */
    select?: HelicopterMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterMessage
     */
    omit?: HelicopterMessageOmit<ExtArgs> | null
  }


  /**
   * Model HelicopterForCharter
   */

  export type AggregateHelicopterForCharter = {
    _count: HelicopterForCharterCountAggregateOutputType | null
    _avg: HelicopterForCharterAvgAggregateOutputType | null
    _sum: HelicopterForCharterSumAggregateOutputType | null
    _min: HelicopterForCharterMinAggregateOutputType | null
    _max: HelicopterForCharterMaxAggregateOutputType | null
  }

  export type HelicopterForCharterAvgAggregateOutputType = {
    year: number | null
    capacity: number | null
    range: number | null
    pricePerHour: number | null
    engineCount: number | null
    maxSpeed: number | null
    cruisingSpeed: number | null
    fuelCapacity: number | null
    maxAltitude: number | null
    flightHours: number | null
    depositAmount: number | null
    minimumHours: number | null
    views: number | null
  }

  export type HelicopterForCharterSumAggregateOutputType = {
    year: number | null
    capacity: number | null
    range: number | null
    pricePerHour: number | null
    engineCount: number | null
    maxSpeed: number | null
    cruisingSpeed: number | null
    fuelCapacity: number | null
    maxAltitude: number | null
    flightHours: number | null
    depositAmount: number | null
    minimumHours: number | null
    views: number | null
  }

  export type HelicopterForCharterMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    model: string | null
    year: number | null
    capacity: number | null
    range: number | null
    pricePerHour: number | null
    location: string | null
    availableFrom: Date | null
    availableTo: Date | null
    description: string | null
    registrationNumber: string | null
    engineType: string | null
    engineCount: number | null
    maxSpeed: number | null
    cruisingSpeed: number | null
    fuelCapacity: number | null
    maxAltitude: number | null
    flightHours: number | null
    lastOverhaul: Date | null
    airworthinessCertificate: string | null
    lastMaintenanceDate: Date | null
    insuranceStatus: string | null
    pilotQualifications: string | null
    hasWifi: boolean | null
    hasRefreshments: boolean | null
    hasEntertainmentSystem: boolean | null
    hasClimatControl: boolean | null
    depositAmount: number | null
    minimumHours: number | null
    cancellationPolicy: string | null
    packageDeals: string | null
    transactionSignature: string | null
    transactionLink: string | null
    vendorId: string | null
    status: string | null
    views: number | null
    sponsored: boolean | null
    sponsoredType: string | null
    endDate: Date | null
  }

  export type HelicopterForCharterMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    model: string | null
    year: number | null
    capacity: number | null
    range: number | null
    pricePerHour: number | null
    location: string | null
    availableFrom: Date | null
    availableTo: Date | null
    description: string | null
    registrationNumber: string | null
    engineType: string | null
    engineCount: number | null
    maxSpeed: number | null
    cruisingSpeed: number | null
    fuelCapacity: number | null
    maxAltitude: number | null
    flightHours: number | null
    lastOverhaul: Date | null
    airworthinessCertificate: string | null
    lastMaintenanceDate: Date | null
    insuranceStatus: string | null
    pilotQualifications: string | null
    hasWifi: boolean | null
    hasRefreshments: boolean | null
    hasEntertainmentSystem: boolean | null
    hasClimatControl: boolean | null
    depositAmount: number | null
    minimumHours: number | null
    cancellationPolicy: string | null
    packageDeals: string | null
    transactionSignature: string | null
    transactionLink: string | null
    vendorId: string | null
    status: string | null
    views: number | null
    sponsored: boolean | null
    sponsoredType: string | null
    endDate: Date | null
  }

  export type HelicopterForCharterCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    model: number
    year: number
    capacity: number
    range: number
    pricePerHour: number
    location: number
    availableFrom: number
    availableTo: number
    description: number
    registrationNumber: number
    engineType: number
    engineCount: number
    maxSpeed: number
    cruisingSpeed: number
    fuelCapacity: number
    maxAltitude: number
    flightHours: number
    lastOverhaul: number
    airworthinessCertificate: number
    lastMaintenanceDate: number
    insuranceStatus: number
    pilotQualifications: number
    safetyFeatures: number
    hasWifi: number
    hasRefreshments: number
    hasEntertainmentSystem: number
    hasClimatControl: number
    depositAmount: number
    minimumHours: number
    cancellationPolicy: number
    packageDeals: number
    imageUrls: number
    transactionSignature: number
    transactionLink: number
    vendorId: number
    status: number
    views: number
    sponsored: number
    sponsoredType: number
    endDate: number
    _all: number
  }


  export type HelicopterForCharterAvgAggregateInputType = {
    year?: true
    capacity?: true
    range?: true
    pricePerHour?: true
    engineCount?: true
    maxSpeed?: true
    cruisingSpeed?: true
    fuelCapacity?: true
    maxAltitude?: true
    flightHours?: true
    depositAmount?: true
    minimumHours?: true
    views?: true
  }

  export type HelicopterForCharterSumAggregateInputType = {
    year?: true
    capacity?: true
    range?: true
    pricePerHour?: true
    engineCount?: true
    maxSpeed?: true
    cruisingSpeed?: true
    fuelCapacity?: true
    maxAltitude?: true
    flightHours?: true
    depositAmount?: true
    minimumHours?: true
    views?: true
  }

  export type HelicopterForCharterMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    model?: true
    year?: true
    capacity?: true
    range?: true
    pricePerHour?: true
    location?: true
    availableFrom?: true
    availableTo?: true
    description?: true
    registrationNumber?: true
    engineType?: true
    engineCount?: true
    maxSpeed?: true
    cruisingSpeed?: true
    fuelCapacity?: true
    maxAltitude?: true
    flightHours?: true
    lastOverhaul?: true
    airworthinessCertificate?: true
    lastMaintenanceDate?: true
    insuranceStatus?: true
    pilotQualifications?: true
    hasWifi?: true
    hasRefreshments?: true
    hasEntertainmentSystem?: true
    hasClimatControl?: true
    depositAmount?: true
    minimumHours?: true
    cancellationPolicy?: true
    packageDeals?: true
    transactionSignature?: true
    transactionLink?: true
    vendorId?: true
    status?: true
    views?: true
    sponsored?: true
    sponsoredType?: true
    endDate?: true
  }

  export type HelicopterForCharterMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    model?: true
    year?: true
    capacity?: true
    range?: true
    pricePerHour?: true
    location?: true
    availableFrom?: true
    availableTo?: true
    description?: true
    registrationNumber?: true
    engineType?: true
    engineCount?: true
    maxSpeed?: true
    cruisingSpeed?: true
    fuelCapacity?: true
    maxAltitude?: true
    flightHours?: true
    lastOverhaul?: true
    airworthinessCertificate?: true
    lastMaintenanceDate?: true
    insuranceStatus?: true
    pilotQualifications?: true
    hasWifi?: true
    hasRefreshments?: true
    hasEntertainmentSystem?: true
    hasClimatControl?: true
    depositAmount?: true
    minimumHours?: true
    cancellationPolicy?: true
    packageDeals?: true
    transactionSignature?: true
    transactionLink?: true
    vendorId?: true
    status?: true
    views?: true
    sponsored?: true
    sponsoredType?: true
    endDate?: true
  }

  export type HelicopterForCharterCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    model?: true
    year?: true
    capacity?: true
    range?: true
    pricePerHour?: true
    location?: true
    availableFrom?: true
    availableTo?: true
    description?: true
    registrationNumber?: true
    engineType?: true
    engineCount?: true
    maxSpeed?: true
    cruisingSpeed?: true
    fuelCapacity?: true
    maxAltitude?: true
    flightHours?: true
    lastOverhaul?: true
    airworthinessCertificate?: true
    lastMaintenanceDate?: true
    insuranceStatus?: true
    pilotQualifications?: true
    safetyFeatures?: true
    hasWifi?: true
    hasRefreshments?: true
    hasEntertainmentSystem?: true
    hasClimatControl?: true
    depositAmount?: true
    minimumHours?: true
    cancellationPolicy?: true
    packageDeals?: true
    imageUrls?: true
    transactionSignature?: true
    transactionLink?: true
    vendorId?: true
    status?: true
    views?: true
    sponsored?: true
    sponsoredType?: true
    endDate?: true
    _all?: true
  }

  export type HelicopterForCharterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterForCharter to aggregate.
     */
    where?: HelicopterForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharters to fetch.
     */
    orderBy?: HelicopterForCharterOrderByWithRelationInput | HelicopterForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HelicopterForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HelicopterForCharters
    **/
    _count?: true | HelicopterForCharterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HelicopterForCharterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HelicopterForCharterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HelicopterForCharterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HelicopterForCharterMaxAggregateInputType
  }

  export type GetHelicopterForCharterAggregateType<T extends HelicopterForCharterAggregateArgs> = {
        [P in keyof T & keyof AggregateHelicopterForCharter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHelicopterForCharter[P]>
      : GetScalarType<T[P], AggregateHelicopterForCharter[P]>
  }




  export type HelicopterForCharterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HelicopterForCharterWhereInput
    orderBy?: HelicopterForCharterOrderByWithAggregationInput | HelicopterForCharterOrderByWithAggregationInput[]
    by: HelicopterForCharterScalarFieldEnum[] | HelicopterForCharterScalarFieldEnum
    having?: HelicopterForCharterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HelicopterForCharterCountAggregateInputType | true
    _avg?: HelicopterForCharterAvgAggregateInputType
    _sum?: HelicopterForCharterSumAggregateInputType
    _min?: HelicopterForCharterMinAggregateInputType
    _max?: HelicopterForCharterMaxAggregateInputType
  }

  export type HelicopterForCharterGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    model: string
    year: number
    capacity: number
    range: number
    pricePerHour: number
    location: string
    availableFrom: Date
    availableTo: Date
    description: string | null
    registrationNumber: string
    engineType: string
    engineCount: number
    maxSpeed: number
    cruisingSpeed: number
    fuelCapacity: number
    maxAltitude: number
    flightHours: number | null
    lastOverhaul: Date | null
    airworthinessCertificate: string
    lastMaintenanceDate: Date
    insuranceStatus: string
    pilotQualifications: string
    safetyFeatures: string[]
    hasWifi: boolean
    hasRefreshments: boolean
    hasEntertainmentSystem: boolean
    hasClimatControl: boolean
    depositAmount: number
    minimumHours: number
    cancellationPolicy: string
    packageDeals: string | null
    imageUrls: string[]
    transactionSignature: string
    transactionLink: string | null
    vendorId: string
    status: string
    views: number
    sponsored: boolean
    sponsoredType: string
    endDate: Date
    _count: HelicopterForCharterCountAggregateOutputType | null
    _avg: HelicopterForCharterAvgAggregateOutputType | null
    _sum: HelicopterForCharterSumAggregateOutputType | null
    _min: HelicopterForCharterMinAggregateOutputType | null
    _max: HelicopterForCharterMaxAggregateOutputType | null
  }

  type GetHelicopterForCharterGroupByPayload<T extends HelicopterForCharterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HelicopterForCharterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HelicopterForCharterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HelicopterForCharterGroupByOutputType[P]>
            : GetScalarType<T[P], HelicopterForCharterGroupByOutputType[P]>
        }
      >
    >


  export type HelicopterForCharterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean
    year?: boolean
    capacity?: boolean
    range?: boolean
    pricePerHour?: boolean
    location?: boolean
    availableFrom?: boolean
    availableTo?: boolean
    description?: boolean
    registrationNumber?: boolean
    engineType?: boolean
    engineCount?: boolean
    maxSpeed?: boolean
    cruisingSpeed?: boolean
    fuelCapacity?: boolean
    maxAltitude?: boolean
    flightHours?: boolean
    lastOverhaul?: boolean
    airworthinessCertificate?: boolean
    lastMaintenanceDate?: boolean
    insuranceStatus?: boolean
    pilotQualifications?: boolean
    safetyFeatures?: boolean
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount?: boolean
    minimumHours?: boolean
    cancellationPolicy?: boolean
    packageDeals?: boolean
    imageUrls?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    status?: boolean
    views?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }, ExtArgs["result"]["helicopterForCharter"]>

  export type HelicopterForCharterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean
    year?: boolean
    capacity?: boolean
    range?: boolean
    pricePerHour?: boolean
    location?: boolean
    availableFrom?: boolean
    availableTo?: boolean
    description?: boolean
    registrationNumber?: boolean
    engineType?: boolean
    engineCount?: boolean
    maxSpeed?: boolean
    cruisingSpeed?: boolean
    fuelCapacity?: boolean
    maxAltitude?: boolean
    flightHours?: boolean
    lastOverhaul?: boolean
    airworthinessCertificate?: boolean
    lastMaintenanceDate?: boolean
    insuranceStatus?: boolean
    pilotQualifications?: boolean
    safetyFeatures?: boolean
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount?: boolean
    minimumHours?: boolean
    cancellationPolicy?: boolean
    packageDeals?: boolean
    imageUrls?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    status?: boolean
    views?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }, ExtArgs["result"]["helicopterForCharter"]>

  export type HelicopterForCharterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean
    year?: boolean
    capacity?: boolean
    range?: boolean
    pricePerHour?: boolean
    location?: boolean
    availableFrom?: boolean
    availableTo?: boolean
    description?: boolean
    registrationNumber?: boolean
    engineType?: boolean
    engineCount?: boolean
    maxSpeed?: boolean
    cruisingSpeed?: boolean
    fuelCapacity?: boolean
    maxAltitude?: boolean
    flightHours?: boolean
    lastOverhaul?: boolean
    airworthinessCertificate?: boolean
    lastMaintenanceDate?: boolean
    insuranceStatus?: boolean
    pilotQualifications?: boolean
    safetyFeatures?: boolean
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount?: boolean
    minimumHours?: boolean
    cancellationPolicy?: boolean
    packageDeals?: boolean
    imageUrls?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    status?: boolean
    views?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }, ExtArgs["result"]["helicopterForCharter"]>

  export type HelicopterForCharterSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean
    year?: boolean
    capacity?: boolean
    range?: boolean
    pricePerHour?: boolean
    location?: boolean
    availableFrom?: boolean
    availableTo?: boolean
    description?: boolean
    registrationNumber?: boolean
    engineType?: boolean
    engineCount?: boolean
    maxSpeed?: boolean
    cruisingSpeed?: boolean
    fuelCapacity?: boolean
    maxAltitude?: boolean
    flightHours?: boolean
    lastOverhaul?: boolean
    airworthinessCertificate?: boolean
    lastMaintenanceDate?: boolean
    insuranceStatus?: boolean
    pilotQualifications?: boolean
    safetyFeatures?: boolean
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount?: boolean
    minimumHours?: boolean
    cancellationPolicy?: boolean
    packageDeals?: boolean
    imageUrls?: boolean
    transactionSignature?: boolean
    transactionLink?: boolean
    vendorId?: boolean
    status?: boolean
    views?: boolean
    sponsored?: boolean
    sponsoredType?: boolean
    endDate?: boolean
  }

  export type HelicopterForCharterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "model" | "year" | "capacity" | "range" | "pricePerHour" | "location" | "availableFrom" | "availableTo" | "description" | "registrationNumber" | "engineType" | "engineCount" | "maxSpeed" | "cruisingSpeed" | "fuelCapacity" | "maxAltitude" | "flightHours" | "lastOverhaul" | "airworthinessCertificate" | "lastMaintenanceDate" | "insuranceStatus" | "pilotQualifications" | "safetyFeatures" | "hasWifi" | "hasRefreshments" | "hasEntertainmentSystem" | "hasClimatControl" | "depositAmount" | "minimumHours" | "cancellationPolicy" | "packageDeals" | "imageUrls" | "transactionSignature" | "transactionLink" | "vendorId" | "status" | "views" | "sponsored" | "sponsoredType" | "endDate", ExtArgs["result"]["helicopterForCharter"]>

  export type $HelicopterForCharterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HelicopterForCharter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      model: string
      year: number
      capacity: number
      range: number
      pricePerHour: number
      location: string
      availableFrom: Date
      availableTo: Date
      description: string | null
      registrationNumber: string
      engineType: string
      engineCount: number
      maxSpeed: number
      cruisingSpeed: number
      fuelCapacity: number
      maxAltitude: number
      flightHours: number | null
      lastOverhaul: Date | null
      airworthinessCertificate: string
      lastMaintenanceDate: Date
      insuranceStatus: string
      pilotQualifications: string
      safetyFeatures: string[]
      hasWifi: boolean
      hasRefreshments: boolean
      hasEntertainmentSystem: boolean
      hasClimatControl: boolean
      depositAmount: number
      minimumHours: number
      cancellationPolicy: string
      packageDeals: string | null
      imageUrls: string[]
      transactionSignature: string
      transactionLink: string | null
      vendorId: string
      status: string
      views: number
      sponsored: boolean
      sponsoredType: string
      endDate: Date
    }, ExtArgs["result"]["helicopterForCharter"]>
    composites: {}
  }

  type HelicopterForCharterGetPayload<S extends boolean | null | undefined | HelicopterForCharterDefaultArgs> = $Result.GetResult<Prisma.$HelicopterForCharterPayload, S>

  type HelicopterForCharterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HelicopterForCharterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HelicopterForCharterCountAggregateInputType | true
    }

  export interface HelicopterForCharterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HelicopterForCharter'], meta: { name: 'HelicopterForCharter' } }
    /**
     * Find zero or one HelicopterForCharter that matches the filter.
     * @param {HelicopterForCharterFindUniqueArgs} args - Arguments to find a HelicopterForCharter
     * @example
     * // Get one HelicopterForCharter
     * const helicopterForCharter = await prisma.helicopterForCharter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HelicopterForCharterFindUniqueArgs>(args: SelectSubset<T, HelicopterForCharterFindUniqueArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HelicopterForCharter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HelicopterForCharterFindUniqueOrThrowArgs} args - Arguments to find a HelicopterForCharter
     * @example
     * // Get one HelicopterForCharter
     * const helicopterForCharter = await prisma.helicopterForCharter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HelicopterForCharterFindUniqueOrThrowArgs>(args: SelectSubset<T, HelicopterForCharterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterForCharter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterFindFirstArgs} args - Arguments to find a HelicopterForCharter
     * @example
     * // Get one HelicopterForCharter
     * const helicopterForCharter = await prisma.helicopterForCharter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HelicopterForCharterFindFirstArgs>(args?: SelectSubset<T, HelicopterForCharterFindFirstArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterForCharter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterFindFirstOrThrowArgs} args - Arguments to find a HelicopterForCharter
     * @example
     * // Get one HelicopterForCharter
     * const helicopterForCharter = await prisma.helicopterForCharter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HelicopterForCharterFindFirstOrThrowArgs>(args?: SelectSubset<T, HelicopterForCharterFindFirstOrThrowArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HelicopterForCharters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HelicopterForCharters
     * const helicopterForCharters = await prisma.helicopterForCharter.findMany()
     * 
     * // Get first 10 HelicopterForCharters
     * const helicopterForCharters = await prisma.helicopterForCharter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const helicopterForCharterWithIdOnly = await prisma.helicopterForCharter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HelicopterForCharterFindManyArgs>(args?: SelectSubset<T, HelicopterForCharterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HelicopterForCharter.
     * @param {HelicopterForCharterCreateArgs} args - Arguments to create a HelicopterForCharter.
     * @example
     * // Create one HelicopterForCharter
     * const HelicopterForCharter = await prisma.helicopterForCharter.create({
     *   data: {
     *     // ... data to create a HelicopterForCharter
     *   }
     * })
     * 
     */
    create<T extends HelicopterForCharterCreateArgs>(args: SelectSubset<T, HelicopterForCharterCreateArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HelicopterForCharters.
     * @param {HelicopterForCharterCreateManyArgs} args - Arguments to create many HelicopterForCharters.
     * @example
     * // Create many HelicopterForCharters
     * const helicopterForCharter = await prisma.helicopterForCharter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HelicopterForCharterCreateManyArgs>(args?: SelectSubset<T, HelicopterForCharterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HelicopterForCharters and returns the data saved in the database.
     * @param {HelicopterForCharterCreateManyAndReturnArgs} args - Arguments to create many HelicopterForCharters.
     * @example
     * // Create many HelicopterForCharters
     * const helicopterForCharter = await prisma.helicopterForCharter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HelicopterForCharters and only return the `id`
     * const helicopterForCharterWithIdOnly = await prisma.helicopterForCharter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HelicopterForCharterCreateManyAndReturnArgs>(args?: SelectSubset<T, HelicopterForCharterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HelicopterForCharter.
     * @param {HelicopterForCharterDeleteArgs} args - Arguments to delete one HelicopterForCharter.
     * @example
     * // Delete one HelicopterForCharter
     * const HelicopterForCharter = await prisma.helicopterForCharter.delete({
     *   where: {
     *     // ... filter to delete one HelicopterForCharter
     *   }
     * })
     * 
     */
    delete<T extends HelicopterForCharterDeleteArgs>(args: SelectSubset<T, HelicopterForCharterDeleteArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HelicopterForCharter.
     * @param {HelicopterForCharterUpdateArgs} args - Arguments to update one HelicopterForCharter.
     * @example
     * // Update one HelicopterForCharter
     * const helicopterForCharter = await prisma.helicopterForCharter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HelicopterForCharterUpdateArgs>(args: SelectSubset<T, HelicopterForCharterUpdateArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HelicopterForCharters.
     * @param {HelicopterForCharterDeleteManyArgs} args - Arguments to filter HelicopterForCharters to delete.
     * @example
     * // Delete a few HelicopterForCharters
     * const { count } = await prisma.helicopterForCharter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HelicopterForCharterDeleteManyArgs>(args?: SelectSubset<T, HelicopterForCharterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterForCharters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HelicopterForCharters
     * const helicopterForCharter = await prisma.helicopterForCharter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HelicopterForCharterUpdateManyArgs>(args: SelectSubset<T, HelicopterForCharterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterForCharters and returns the data updated in the database.
     * @param {HelicopterForCharterUpdateManyAndReturnArgs} args - Arguments to update many HelicopterForCharters.
     * @example
     * // Update many HelicopterForCharters
     * const helicopterForCharter = await prisma.helicopterForCharter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HelicopterForCharters and only return the `id`
     * const helicopterForCharterWithIdOnly = await prisma.helicopterForCharter.updateManyAndReturn({
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
    updateManyAndReturn<T extends HelicopterForCharterUpdateManyAndReturnArgs>(args: SelectSubset<T, HelicopterForCharterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HelicopterForCharter.
     * @param {HelicopterForCharterUpsertArgs} args - Arguments to update or create a HelicopterForCharter.
     * @example
     * // Update or create a HelicopterForCharter
     * const helicopterForCharter = await prisma.helicopterForCharter.upsert({
     *   create: {
     *     // ... data to create a HelicopterForCharter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HelicopterForCharter we want to update
     *   }
     * })
     */
    upsert<T extends HelicopterForCharterUpsertArgs>(args: SelectSubset<T, HelicopterForCharterUpsertArgs<ExtArgs>>): Prisma__HelicopterForCharterClient<$Result.GetResult<Prisma.$HelicopterForCharterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HelicopterForCharters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterCountArgs} args - Arguments to filter HelicopterForCharters to count.
     * @example
     * // Count the number of HelicopterForCharters
     * const count = await prisma.helicopterForCharter.count({
     *   where: {
     *     // ... the filter for the HelicopterForCharters we want to count
     *   }
     * })
    **/
    count<T extends HelicopterForCharterCountArgs>(
      args?: Subset<T, HelicopterForCharterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HelicopterForCharterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HelicopterForCharter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HelicopterForCharterAggregateArgs>(args: Subset<T, HelicopterForCharterAggregateArgs>): Prisma.PrismaPromise<GetHelicopterForCharterAggregateType<T>>

    /**
     * Group by HelicopterForCharter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterGroupByArgs} args - Group by arguments.
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
      T extends HelicopterForCharterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HelicopterForCharterGroupByArgs['orderBy'] }
        : { orderBy?: HelicopterForCharterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HelicopterForCharterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHelicopterForCharterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HelicopterForCharter model
   */
  readonly fields: HelicopterForCharterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HelicopterForCharter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HelicopterForCharterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the HelicopterForCharter model
   */
  interface HelicopterForCharterFieldRefs {
    readonly id: FieldRef<"HelicopterForCharter", 'String'>
    readonly createdAt: FieldRef<"HelicopterForCharter", 'DateTime'>
    readonly updatedAt: FieldRef<"HelicopterForCharter", 'DateTime'>
    readonly model: FieldRef<"HelicopterForCharter", 'String'>
    readonly year: FieldRef<"HelicopterForCharter", 'Int'>
    readonly capacity: FieldRef<"HelicopterForCharter", 'Int'>
    readonly range: FieldRef<"HelicopterForCharter", 'Float'>
    readonly pricePerHour: FieldRef<"HelicopterForCharter", 'Float'>
    readonly location: FieldRef<"HelicopterForCharter", 'String'>
    readonly availableFrom: FieldRef<"HelicopterForCharter", 'DateTime'>
    readonly availableTo: FieldRef<"HelicopterForCharter", 'DateTime'>
    readonly description: FieldRef<"HelicopterForCharter", 'String'>
    readonly registrationNumber: FieldRef<"HelicopterForCharter", 'String'>
    readonly engineType: FieldRef<"HelicopterForCharter", 'String'>
    readonly engineCount: FieldRef<"HelicopterForCharter", 'Int'>
    readonly maxSpeed: FieldRef<"HelicopterForCharter", 'Float'>
    readonly cruisingSpeed: FieldRef<"HelicopterForCharter", 'Float'>
    readonly fuelCapacity: FieldRef<"HelicopterForCharter", 'Float'>
    readonly maxAltitude: FieldRef<"HelicopterForCharter", 'Float'>
    readonly flightHours: FieldRef<"HelicopterForCharter", 'Float'>
    readonly lastOverhaul: FieldRef<"HelicopterForCharter", 'DateTime'>
    readonly airworthinessCertificate: FieldRef<"HelicopterForCharter", 'String'>
    readonly lastMaintenanceDate: FieldRef<"HelicopterForCharter", 'DateTime'>
    readonly insuranceStatus: FieldRef<"HelicopterForCharter", 'String'>
    readonly pilotQualifications: FieldRef<"HelicopterForCharter", 'String'>
    readonly safetyFeatures: FieldRef<"HelicopterForCharter", 'String[]'>
    readonly hasWifi: FieldRef<"HelicopterForCharter", 'Boolean'>
    readonly hasRefreshments: FieldRef<"HelicopterForCharter", 'Boolean'>
    readonly hasEntertainmentSystem: FieldRef<"HelicopterForCharter", 'Boolean'>
    readonly hasClimatControl: FieldRef<"HelicopterForCharter", 'Boolean'>
    readonly depositAmount: FieldRef<"HelicopterForCharter", 'Float'>
    readonly minimumHours: FieldRef<"HelicopterForCharter", 'Float'>
    readonly cancellationPolicy: FieldRef<"HelicopterForCharter", 'String'>
    readonly packageDeals: FieldRef<"HelicopterForCharter", 'String'>
    readonly imageUrls: FieldRef<"HelicopterForCharter", 'String[]'>
    readonly transactionSignature: FieldRef<"HelicopterForCharter", 'String'>
    readonly transactionLink: FieldRef<"HelicopterForCharter", 'String'>
    readonly vendorId: FieldRef<"HelicopterForCharter", 'String'>
    readonly status: FieldRef<"HelicopterForCharter", 'String'>
    readonly views: FieldRef<"HelicopterForCharter", 'Int'>
    readonly sponsored: FieldRef<"HelicopterForCharter", 'Boolean'>
    readonly sponsoredType: FieldRef<"HelicopterForCharter", 'String'>
    readonly endDate: FieldRef<"HelicopterForCharter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HelicopterForCharter findUnique
   */
  export type HelicopterForCharterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharter to fetch.
     */
    where: HelicopterForCharterWhereUniqueInput
  }

  /**
   * HelicopterForCharter findUniqueOrThrow
   */
  export type HelicopterForCharterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharter to fetch.
     */
    where: HelicopterForCharterWhereUniqueInput
  }

  /**
   * HelicopterForCharter findFirst
   */
  export type HelicopterForCharterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharter to fetch.
     */
    where?: HelicopterForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharters to fetch.
     */
    orderBy?: HelicopterForCharterOrderByWithRelationInput | HelicopterForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterForCharters.
     */
    cursor?: HelicopterForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterForCharters.
     */
    distinct?: HelicopterForCharterScalarFieldEnum | HelicopterForCharterScalarFieldEnum[]
  }

  /**
   * HelicopterForCharter findFirstOrThrow
   */
  export type HelicopterForCharterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharter to fetch.
     */
    where?: HelicopterForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharters to fetch.
     */
    orderBy?: HelicopterForCharterOrderByWithRelationInput | HelicopterForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterForCharters.
     */
    cursor?: HelicopterForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterForCharters.
     */
    distinct?: HelicopterForCharterScalarFieldEnum | HelicopterForCharterScalarFieldEnum[]
  }

  /**
   * HelicopterForCharter findMany
   */
  export type HelicopterForCharterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharters to fetch.
     */
    where?: HelicopterForCharterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharters to fetch.
     */
    orderBy?: HelicopterForCharterOrderByWithRelationInput | HelicopterForCharterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HelicopterForCharters.
     */
    cursor?: HelicopterForCharterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharters.
     */
    skip?: number
    distinct?: HelicopterForCharterScalarFieldEnum | HelicopterForCharterScalarFieldEnum[]
  }

  /**
   * HelicopterForCharter create
   */
  export type HelicopterForCharterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * The data needed to create a HelicopterForCharter.
     */
    data: XOR<HelicopterForCharterCreateInput, HelicopterForCharterUncheckedCreateInput>
  }

  /**
   * HelicopterForCharter createMany
   */
  export type HelicopterForCharterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HelicopterForCharters.
     */
    data: HelicopterForCharterCreateManyInput | HelicopterForCharterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterForCharter createManyAndReturn
   */
  export type HelicopterForCharterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * The data used to create many HelicopterForCharters.
     */
    data: HelicopterForCharterCreateManyInput | HelicopterForCharterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterForCharter update
   */
  export type HelicopterForCharterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * The data needed to update a HelicopterForCharter.
     */
    data: XOR<HelicopterForCharterUpdateInput, HelicopterForCharterUncheckedUpdateInput>
    /**
     * Choose, which HelicopterForCharter to update.
     */
    where: HelicopterForCharterWhereUniqueInput
  }

  /**
   * HelicopterForCharter updateMany
   */
  export type HelicopterForCharterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HelicopterForCharters.
     */
    data: XOR<HelicopterForCharterUpdateManyMutationInput, HelicopterForCharterUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterForCharters to update
     */
    where?: HelicopterForCharterWhereInput
    /**
     * Limit how many HelicopterForCharters to update.
     */
    limit?: number
  }

  /**
   * HelicopterForCharter updateManyAndReturn
   */
  export type HelicopterForCharterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * The data used to update HelicopterForCharters.
     */
    data: XOR<HelicopterForCharterUpdateManyMutationInput, HelicopterForCharterUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterForCharters to update
     */
    where?: HelicopterForCharterWhereInput
    /**
     * Limit how many HelicopterForCharters to update.
     */
    limit?: number
  }

  /**
   * HelicopterForCharter upsert
   */
  export type HelicopterForCharterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * The filter to search for the HelicopterForCharter to update in case it exists.
     */
    where: HelicopterForCharterWhereUniqueInput
    /**
     * In case the HelicopterForCharter found by the `where` argument doesn't exist, create a new HelicopterForCharter with this data.
     */
    create: XOR<HelicopterForCharterCreateInput, HelicopterForCharterUncheckedCreateInput>
    /**
     * In case the HelicopterForCharter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HelicopterForCharterUpdateInput, HelicopterForCharterUncheckedUpdateInput>
  }

  /**
   * HelicopterForCharter delete
   */
  export type HelicopterForCharterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
    /**
     * Filter which HelicopterForCharter to delete.
     */
    where: HelicopterForCharterWhereUniqueInput
  }

  /**
   * HelicopterForCharter deleteMany
   */
  export type HelicopterForCharterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterForCharters to delete
     */
    where?: HelicopterForCharterWhereInput
    /**
     * Limit how many HelicopterForCharters to delete.
     */
    limit?: number
  }

  /**
   * HelicopterForCharter without action
   */
  export type HelicopterForCharterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharter
     */
    select?: HelicopterForCharterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharter
     */
    omit?: HelicopterForCharterOmit<ExtArgs> | null
  }


  /**
   * Model HelicopterForCharterMessages
   */

  export type AggregateHelicopterForCharterMessages = {
    _count: HelicopterForCharterMessagesCountAggregateOutputType | null
    _avg: HelicopterForCharterMessagesAvgAggregateOutputType | null
    _sum: HelicopterForCharterMessagesSumAggregateOutputType | null
    _min: HelicopterForCharterMessagesMinAggregateOutputType | null
    _max: HelicopterForCharterMessagesMaxAggregateOutputType | null
  }

  export type HelicopterForCharterMessagesAvgAggregateOutputType = {
    passengerCount: number | null
  }

  export type HelicopterForCharterMessagesSumAggregateOutputType = {
    passengerCount: number | null
  }

  export type HelicopterForCharterMessagesMinAggregateOutputType = {
    id: string | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    departureLocation: string | null
    arrivalLocation: string | null
    departureDate: Date | null
    returnDate: Date | null
    passengerCount: number | null
    specialRequests: string | null
    listingId: string | null
    vendorId: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type HelicopterForCharterMessagesMaxAggregateOutputType = {
    id: string | null
    customerName: string | null
    customerEmail: string | null
    customerCountry: string | null
    departureLocation: string | null
    arrivalLocation: string | null
    departureDate: Date | null
    returnDate: Date | null
    passengerCount: number | null
    specialRequests: string | null
    listingId: string | null
    vendorId: string | null
    createdAt: Date | null
    read: boolean | null
  }

  export type HelicopterForCharterMessagesCountAggregateOutputType = {
    id: number
    customerName: number
    customerEmail: number
    customerCountry: number
    departureLocation: number
    arrivalLocation: number
    departureDate: number
    returnDate: number
    passengerCount: number
    specialRequests: number
    listingId: number
    vendorId: number
    createdAt: number
    read: number
    _all: number
  }


  export type HelicopterForCharterMessagesAvgAggregateInputType = {
    passengerCount?: true
  }

  export type HelicopterForCharterMessagesSumAggregateInputType = {
    passengerCount?: true
  }

  export type HelicopterForCharterMessagesMinAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    departureLocation?: true
    arrivalLocation?: true
    departureDate?: true
    returnDate?: true
    passengerCount?: true
    specialRequests?: true
    listingId?: true
    vendorId?: true
    createdAt?: true
    read?: true
  }

  export type HelicopterForCharterMessagesMaxAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    departureLocation?: true
    arrivalLocation?: true
    departureDate?: true
    returnDate?: true
    passengerCount?: true
    specialRequests?: true
    listingId?: true
    vendorId?: true
    createdAt?: true
    read?: true
  }

  export type HelicopterForCharterMessagesCountAggregateInputType = {
    id?: true
    customerName?: true
    customerEmail?: true
    customerCountry?: true
    departureLocation?: true
    arrivalLocation?: true
    departureDate?: true
    returnDate?: true
    passengerCount?: true
    specialRequests?: true
    listingId?: true
    vendorId?: true
    createdAt?: true
    read?: true
    _all?: true
  }

  export type HelicopterForCharterMessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterForCharterMessages to aggregate.
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharterMessages to fetch.
     */
    orderBy?: HelicopterForCharterMessagesOrderByWithRelationInput | HelicopterForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HelicopterForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HelicopterForCharterMessages
    **/
    _count?: true | HelicopterForCharterMessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HelicopterForCharterMessagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HelicopterForCharterMessagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HelicopterForCharterMessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HelicopterForCharterMessagesMaxAggregateInputType
  }

  export type GetHelicopterForCharterMessagesAggregateType<T extends HelicopterForCharterMessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateHelicopterForCharterMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHelicopterForCharterMessages[P]>
      : GetScalarType<T[P], AggregateHelicopterForCharterMessages[P]>
  }




  export type HelicopterForCharterMessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HelicopterForCharterMessagesWhereInput
    orderBy?: HelicopterForCharterMessagesOrderByWithAggregationInput | HelicopterForCharterMessagesOrderByWithAggregationInput[]
    by: HelicopterForCharterMessagesScalarFieldEnum[] | HelicopterForCharterMessagesScalarFieldEnum
    having?: HelicopterForCharterMessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HelicopterForCharterMessagesCountAggregateInputType | true
    _avg?: HelicopterForCharterMessagesAvgAggregateInputType
    _sum?: HelicopterForCharterMessagesSumAggregateInputType
    _min?: HelicopterForCharterMessagesMinAggregateInputType
    _max?: HelicopterForCharterMessagesMaxAggregateInputType
  }

  export type HelicopterForCharterMessagesGroupByOutputType = {
    id: string
    customerName: string
    customerEmail: string
    customerCountry: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date
    returnDate: Date | null
    passengerCount: number
    specialRequests: string | null
    listingId: string
    vendorId: string
    createdAt: Date
    read: boolean
    _count: HelicopterForCharterMessagesCountAggregateOutputType | null
    _avg: HelicopterForCharterMessagesAvgAggregateOutputType | null
    _sum: HelicopterForCharterMessagesSumAggregateOutputType | null
    _min: HelicopterForCharterMessagesMinAggregateOutputType | null
    _max: HelicopterForCharterMessagesMaxAggregateOutputType | null
  }

  type GetHelicopterForCharterMessagesGroupByPayload<T extends HelicopterForCharterMessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HelicopterForCharterMessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HelicopterForCharterMessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HelicopterForCharterMessagesGroupByOutputType[P]>
            : GetScalarType<T[P], HelicopterForCharterMessagesGroupByOutputType[P]>
        }
      >
    >


  export type HelicopterForCharterMessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["helicopterForCharterMessages"]>

  export type HelicopterForCharterMessagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["helicopterForCharterMessages"]>

  export type HelicopterForCharterMessagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }, ExtArgs["result"]["helicopterForCharterMessages"]>

  export type HelicopterForCharterMessagesSelectScalar = {
    id?: boolean
    customerName?: boolean
    customerEmail?: boolean
    customerCountry?: boolean
    departureLocation?: boolean
    arrivalLocation?: boolean
    departureDate?: boolean
    returnDate?: boolean
    passengerCount?: boolean
    specialRequests?: boolean
    listingId?: boolean
    vendorId?: boolean
    createdAt?: boolean
    read?: boolean
  }

  export type HelicopterForCharterMessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerName" | "customerEmail" | "customerCountry" | "departureLocation" | "arrivalLocation" | "departureDate" | "returnDate" | "passengerCount" | "specialRequests" | "listingId" | "vendorId" | "createdAt" | "read", ExtArgs["result"]["helicopterForCharterMessages"]>

  export type $HelicopterForCharterMessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HelicopterForCharterMessages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerName: string
      customerEmail: string
      customerCountry: string | null
      departureLocation: string
      arrivalLocation: string
      departureDate: Date
      returnDate: Date | null
      passengerCount: number
      specialRequests: string | null
      listingId: string
      vendorId: string
      createdAt: Date
      read: boolean
    }, ExtArgs["result"]["helicopterForCharterMessages"]>
    composites: {}
  }

  type HelicopterForCharterMessagesGetPayload<S extends boolean | null | undefined | HelicopterForCharterMessagesDefaultArgs> = $Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload, S>

  type HelicopterForCharterMessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HelicopterForCharterMessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HelicopterForCharterMessagesCountAggregateInputType | true
    }

  export interface HelicopterForCharterMessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HelicopterForCharterMessages'], meta: { name: 'HelicopterForCharterMessages' } }
    /**
     * Find zero or one HelicopterForCharterMessages that matches the filter.
     * @param {HelicopterForCharterMessagesFindUniqueArgs} args - Arguments to find a HelicopterForCharterMessages
     * @example
     * // Get one HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HelicopterForCharterMessagesFindUniqueArgs>(args: SelectSubset<T, HelicopterForCharterMessagesFindUniqueArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HelicopterForCharterMessages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HelicopterForCharterMessagesFindUniqueOrThrowArgs} args - Arguments to find a HelicopterForCharterMessages
     * @example
     * // Get one HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HelicopterForCharterMessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, HelicopterForCharterMessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterForCharterMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesFindFirstArgs} args - Arguments to find a HelicopterForCharterMessages
     * @example
     * // Get one HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HelicopterForCharterMessagesFindFirstArgs>(args?: SelectSubset<T, HelicopterForCharterMessagesFindFirstArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HelicopterForCharterMessages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesFindFirstOrThrowArgs} args - Arguments to find a HelicopterForCharterMessages
     * @example
     * // Get one HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HelicopterForCharterMessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, HelicopterForCharterMessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HelicopterForCharterMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findMany()
     * 
     * // Get first 10 HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const helicopterForCharterMessagesWithIdOnly = await prisma.helicopterForCharterMessages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HelicopterForCharterMessagesFindManyArgs>(args?: SelectSubset<T, HelicopterForCharterMessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HelicopterForCharterMessages.
     * @param {HelicopterForCharterMessagesCreateArgs} args - Arguments to create a HelicopterForCharterMessages.
     * @example
     * // Create one HelicopterForCharterMessages
     * const HelicopterForCharterMessages = await prisma.helicopterForCharterMessages.create({
     *   data: {
     *     // ... data to create a HelicopterForCharterMessages
     *   }
     * })
     * 
     */
    create<T extends HelicopterForCharterMessagesCreateArgs>(args: SelectSubset<T, HelicopterForCharterMessagesCreateArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HelicopterForCharterMessages.
     * @param {HelicopterForCharterMessagesCreateManyArgs} args - Arguments to create many HelicopterForCharterMessages.
     * @example
     * // Create many HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HelicopterForCharterMessagesCreateManyArgs>(args?: SelectSubset<T, HelicopterForCharterMessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HelicopterForCharterMessages and returns the data saved in the database.
     * @param {HelicopterForCharterMessagesCreateManyAndReturnArgs} args - Arguments to create many HelicopterForCharterMessages.
     * @example
     * // Create many HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HelicopterForCharterMessages and only return the `id`
     * const helicopterForCharterMessagesWithIdOnly = await prisma.helicopterForCharterMessages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HelicopterForCharterMessagesCreateManyAndReturnArgs>(args?: SelectSubset<T, HelicopterForCharterMessagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HelicopterForCharterMessages.
     * @param {HelicopterForCharterMessagesDeleteArgs} args - Arguments to delete one HelicopterForCharterMessages.
     * @example
     * // Delete one HelicopterForCharterMessages
     * const HelicopterForCharterMessages = await prisma.helicopterForCharterMessages.delete({
     *   where: {
     *     // ... filter to delete one HelicopterForCharterMessages
     *   }
     * })
     * 
     */
    delete<T extends HelicopterForCharterMessagesDeleteArgs>(args: SelectSubset<T, HelicopterForCharterMessagesDeleteArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HelicopterForCharterMessages.
     * @param {HelicopterForCharterMessagesUpdateArgs} args - Arguments to update one HelicopterForCharterMessages.
     * @example
     * // Update one HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HelicopterForCharterMessagesUpdateArgs>(args: SelectSubset<T, HelicopterForCharterMessagesUpdateArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HelicopterForCharterMessages.
     * @param {HelicopterForCharterMessagesDeleteManyArgs} args - Arguments to filter HelicopterForCharterMessages to delete.
     * @example
     * // Delete a few HelicopterForCharterMessages
     * const { count } = await prisma.helicopterForCharterMessages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HelicopterForCharterMessagesDeleteManyArgs>(args?: SelectSubset<T, HelicopterForCharterMessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HelicopterForCharterMessagesUpdateManyArgs>(args: SelectSubset<T, HelicopterForCharterMessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HelicopterForCharterMessages and returns the data updated in the database.
     * @param {HelicopterForCharterMessagesUpdateManyAndReturnArgs} args - Arguments to update many HelicopterForCharterMessages.
     * @example
     * // Update many HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HelicopterForCharterMessages and only return the `id`
     * const helicopterForCharterMessagesWithIdOnly = await prisma.helicopterForCharterMessages.updateManyAndReturn({
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
    updateManyAndReturn<T extends HelicopterForCharterMessagesUpdateManyAndReturnArgs>(args: SelectSubset<T, HelicopterForCharterMessagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HelicopterForCharterMessages.
     * @param {HelicopterForCharterMessagesUpsertArgs} args - Arguments to update or create a HelicopterForCharterMessages.
     * @example
     * // Update or create a HelicopterForCharterMessages
     * const helicopterForCharterMessages = await prisma.helicopterForCharterMessages.upsert({
     *   create: {
     *     // ... data to create a HelicopterForCharterMessages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HelicopterForCharterMessages we want to update
     *   }
     * })
     */
    upsert<T extends HelicopterForCharterMessagesUpsertArgs>(args: SelectSubset<T, HelicopterForCharterMessagesUpsertArgs<ExtArgs>>): Prisma__HelicopterForCharterMessagesClient<$Result.GetResult<Prisma.$HelicopterForCharterMessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HelicopterForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesCountArgs} args - Arguments to filter HelicopterForCharterMessages to count.
     * @example
     * // Count the number of HelicopterForCharterMessages
     * const count = await prisma.helicopterForCharterMessages.count({
     *   where: {
     *     // ... the filter for the HelicopterForCharterMessages we want to count
     *   }
     * })
    **/
    count<T extends HelicopterForCharterMessagesCountArgs>(
      args?: Subset<T, HelicopterForCharterMessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HelicopterForCharterMessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HelicopterForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HelicopterForCharterMessagesAggregateArgs>(args: Subset<T, HelicopterForCharterMessagesAggregateArgs>): Prisma.PrismaPromise<GetHelicopterForCharterMessagesAggregateType<T>>

    /**
     * Group by HelicopterForCharterMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HelicopterForCharterMessagesGroupByArgs} args - Group by arguments.
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
      T extends HelicopterForCharterMessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HelicopterForCharterMessagesGroupByArgs['orderBy'] }
        : { orderBy?: HelicopterForCharterMessagesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HelicopterForCharterMessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHelicopterForCharterMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HelicopterForCharterMessages model
   */
  readonly fields: HelicopterForCharterMessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HelicopterForCharterMessages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HelicopterForCharterMessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the HelicopterForCharterMessages model
   */
  interface HelicopterForCharterMessagesFieldRefs {
    readonly id: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly customerName: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly customerEmail: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly customerCountry: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly departureLocation: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly arrivalLocation: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly departureDate: FieldRef<"HelicopterForCharterMessages", 'DateTime'>
    readonly returnDate: FieldRef<"HelicopterForCharterMessages", 'DateTime'>
    readonly passengerCount: FieldRef<"HelicopterForCharterMessages", 'Int'>
    readonly specialRequests: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly listingId: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly vendorId: FieldRef<"HelicopterForCharterMessages", 'String'>
    readonly createdAt: FieldRef<"HelicopterForCharterMessages", 'DateTime'>
    readonly read: FieldRef<"HelicopterForCharterMessages", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * HelicopterForCharterMessages findUnique
   */
  export type HelicopterForCharterMessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharterMessages to fetch.
     */
    where: HelicopterForCharterMessagesWhereUniqueInput
  }

  /**
   * HelicopterForCharterMessages findUniqueOrThrow
   */
  export type HelicopterForCharterMessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharterMessages to fetch.
     */
    where: HelicopterForCharterMessagesWhereUniqueInput
  }

  /**
   * HelicopterForCharterMessages findFirst
   */
  export type HelicopterForCharterMessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharterMessages to fetch.
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharterMessages to fetch.
     */
    orderBy?: HelicopterForCharterMessagesOrderByWithRelationInput | HelicopterForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterForCharterMessages.
     */
    cursor?: HelicopterForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterForCharterMessages.
     */
    distinct?: HelicopterForCharterMessagesScalarFieldEnum | HelicopterForCharterMessagesScalarFieldEnum[]
  }

  /**
   * HelicopterForCharterMessages findFirstOrThrow
   */
  export type HelicopterForCharterMessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharterMessages to fetch.
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharterMessages to fetch.
     */
    orderBy?: HelicopterForCharterMessagesOrderByWithRelationInput | HelicopterForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HelicopterForCharterMessages.
     */
    cursor?: HelicopterForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharterMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HelicopterForCharterMessages.
     */
    distinct?: HelicopterForCharterMessagesScalarFieldEnum | HelicopterForCharterMessagesScalarFieldEnum[]
  }

  /**
   * HelicopterForCharterMessages findMany
   */
  export type HelicopterForCharterMessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter, which HelicopterForCharterMessages to fetch.
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HelicopterForCharterMessages to fetch.
     */
    orderBy?: HelicopterForCharterMessagesOrderByWithRelationInput | HelicopterForCharterMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HelicopterForCharterMessages.
     */
    cursor?: HelicopterForCharterMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HelicopterForCharterMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HelicopterForCharterMessages.
     */
    skip?: number
    distinct?: HelicopterForCharterMessagesScalarFieldEnum | HelicopterForCharterMessagesScalarFieldEnum[]
  }

  /**
   * HelicopterForCharterMessages create
   */
  export type HelicopterForCharterMessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data needed to create a HelicopterForCharterMessages.
     */
    data: XOR<HelicopterForCharterMessagesCreateInput, HelicopterForCharterMessagesUncheckedCreateInput>
  }

  /**
   * HelicopterForCharterMessages createMany
   */
  export type HelicopterForCharterMessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HelicopterForCharterMessages.
     */
    data: HelicopterForCharterMessagesCreateManyInput | HelicopterForCharterMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterForCharterMessages createManyAndReturn
   */
  export type HelicopterForCharterMessagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data used to create many HelicopterForCharterMessages.
     */
    data: HelicopterForCharterMessagesCreateManyInput | HelicopterForCharterMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HelicopterForCharterMessages update
   */
  export type HelicopterForCharterMessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data needed to update a HelicopterForCharterMessages.
     */
    data: XOR<HelicopterForCharterMessagesUpdateInput, HelicopterForCharterMessagesUncheckedUpdateInput>
    /**
     * Choose, which HelicopterForCharterMessages to update.
     */
    where: HelicopterForCharterMessagesWhereUniqueInput
  }

  /**
   * HelicopterForCharterMessages updateMany
   */
  export type HelicopterForCharterMessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HelicopterForCharterMessages.
     */
    data: XOR<HelicopterForCharterMessagesUpdateManyMutationInput, HelicopterForCharterMessagesUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterForCharterMessages to update
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * Limit how many HelicopterForCharterMessages to update.
     */
    limit?: number
  }

  /**
   * HelicopterForCharterMessages updateManyAndReturn
   */
  export type HelicopterForCharterMessagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * The data used to update HelicopterForCharterMessages.
     */
    data: XOR<HelicopterForCharterMessagesUpdateManyMutationInput, HelicopterForCharterMessagesUncheckedUpdateManyInput>
    /**
     * Filter which HelicopterForCharterMessages to update
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * Limit how many HelicopterForCharterMessages to update.
     */
    limit?: number
  }

  /**
   * HelicopterForCharterMessages upsert
   */
  export type HelicopterForCharterMessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * The filter to search for the HelicopterForCharterMessages to update in case it exists.
     */
    where: HelicopterForCharterMessagesWhereUniqueInput
    /**
     * In case the HelicopterForCharterMessages found by the `where` argument doesn't exist, create a new HelicopterForCharterMessages with this data.
     */
    create: XOR<HelicopterForCharterMessagesCreateInput, HelicopterForCharterMessagesUncheckedCreateInput>
    /**
     * In case the HelicopterForCharterMessages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HelicopterForCharterMessagesUpdateInput, HelicopterForCharterMessagesUncheckedUpdateInput>
  }

  /**
   * HelicopterForCharterMessages delete
   */
  export type HelicopterForCharterMessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
    /**
     * Filter which HelicopterForCharterMessages to delete.
     */
    where: HelicopterForCharterMessagesWhereUniqueInput
  }

  /**
   * HelicopterForCharterMessages deleteMany
   */
  export type HelicopterForCharterMessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HelicopterForCharterMessages to delete
     */
    where?: HelicopterForCharterMessagesWhereInput
    /**
     * Limit how many HelicopterForCharterMessages to delete.
     */
    limit?: number
  }

  /**
   * HelicopterForCharterMessages without action
   */
  export type HelicopterForCharterMessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HelicopterForCharterMessages
     */
    select?: HelicopterForCharterMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HelicopterForCharterMessages
     */
    omit?: HelicopterForCharterMessagesOmit<ExtArgs> | null
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
    end_date: 'end_date',
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


  export const JetForCharterMessagesScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerCountry: 'customerCountry',
    departureLocation: 'departureLocation',
    arrivalLocation: 'arrivalLocation',
    departureDate: 'departureDate',
    returnDate: 'returnDate',
    passengerCount: 'passengerCount',
    specialRequests: 'specialRequests',
    listingId: 'listingId',
    vendorId: 'vendorId',
    createdAt: 'createdAt',
    read: 'read'
  };

  export type JetForCharterMessagesScalarFieldEnum = (typeof JetForCharterMessagesScalarFieldEnum)[keyof typeof JetForCharterMessagesScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    wallet: 'wallet'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const HelicopterForSaleListingScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    helicopterName: 'helicopterName',
    helicopterType: 'helicopterType',
    manufacturer: 'manufacturer',
    yearOfManufacture: 'yearOfManufacture',
    registrationNumber: 'registrationNumber',
    serialNumber: 'serialNumber',
    seatingCapacity: 'seatingCapacity',
    maximumRange: 'maximumRange',
    cruisingSpeed: 'cruisingSpeed',
    baggageCapacity: 'baggageCapacity',
    condition: 'condition',
    totalFlightHours: 'totalFlightHours',
    maintenanceHistory: 'maintenanceHistory',
    lastInspection: 'lastInspection',
    salePrice: 'salePrice',
    discounts: 'discounts',
    avionics: 'avionics',
    emergencyEquipment: 'emergencyEquipment',
    cargoHook: 'cargoHook',
    videoLink: 'videoLink',
    exteriorImageUrls: 'exteriorImageUrls',
    interiorImageUrls: 'interiorImageUrls',
    additionalEquipment: 'additionalEquipment',
    transactionSignature: 'transactionSignature',
    transactionLink: 'transactionLink',
    vendorId: 'vendorId',
    views: 'views',
    status: 'status',
    sponsored: 'sponsored',
    sponsoredType: 'sponsoredType',
    endDate: 'endDate'
  };

  export type HelicopterForSaleListingScalarFieldEnum = (typeof HelicopterForSaleListingScalarFieldEnum)[keyof typeof HelicopterForSaleListingScalarFieldEnum]


  export const CabinFeatureScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name'
  };

  export type CabinFeatureScalarFieldEnum = (typeof CabinFeatureScalarFieldEnum)[keyof typeof CabinFeatureScalarFieldEnum]


  export const HelicopterMessageScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerCountry: 'customerCountry',
    listingId: 'listingId',
    vendorId: 'vendorId',
    message: 'message',
    read: 'read'
  };

  export type HelicopterMessageScalarFieldEnum = (typeof HelicopterMessageScalarFieldEnum)[keyof typeof HelicopterMessageScalarFieldEnum]


  export const HelicopterForCharterScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    model: 'model',
    year: 'year',
    capacity: 'capacity',
    range: 'range',
    pricePerHour: 'pricePerHour',
    location: 'location',
    availableFrom: 'availableFrom',
    availableTo: 'availableTo',
    description: 'description',
    registrationNumber: 'registrationNumber',
    engineType: 'engineType',
    engineCount: 'engineCount',
    maxSpeed: 'maxSpeed',
    cruisingSpeed: 'cruisingSpeed',
    fuelCapacity: 'fuelCapacity',
    maxAltitude: 'maxAltitude',
    flightHours: 'flightHours',
    lastOverhaul: 'lastOverhaul',
    airworthinessCertificate: 'airworthinessCertificate',
    lastMaintenanceDate: 'lastMaintenanceDate',
    insuranceStatus: 'insuranceStatus',
    pilotQualifications: 'pilotQualifications',
    safetyFeatures: 'safetyFeatures',
    hasWifi: 'hasWifi',
    hasRefreshments: 'hasRefreshments',
    hasEntertainmentSystem: 'hasEntertainmentSystem',
    hasClimatControl: 'hasClimatControl',
    depositAmount: 'depositAmount',
    minimumHours: 'minimumHours',
    cancellationPolicy: 'cancellationPolicy',
    packageDeals: 'packageDeals',
    imageUrls: 'imageUrls',
    transactionSignature: 'transactionSignature',
    transactionLink: 'transactionLink',
    vendorId: 'vendorId',
    status: 'status',
    views: 'views',
    sponsored: 'sponsored',
    sponsoredType: 'sponsoredType',
    endDate: 'endDate'
  };

  export type HelicopterForCharterScalarFieldEnum = (typeof HelicopterForCharterScalarFieldEnum)[keyof typeof HelicopterForCharterScalarFieldEnum]


  export const HelicopterForCharterMessagesScalarFieldEnum: {
    id: 'id',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    customerCountry: 'customerCountry',
    departureLocation: 'departureLocation',
    arrivalLocation: 'arrivalLocation',
    departureDate: 'departureDate',
    returnDate: 'returnDate',
    passengerCount: 'passengerCount',
    specialRequests: 'specialRequests',
    listingId: 'listingId',
    vendorId: 'vendorId',
    createdAt: 'createdAt',
    read: 'read'
  };

  export type HelicopterForCharterMessagesScalarFieldEnum = (typeof HelicopterForCharterMessagesScalarFieldEnum)[keyof typeof HelicopterForCharterMessagesScalarFieldEnum]


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
    end_date?: DateTimeFilter<"JetForCharter"> | Date | string
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
    end_date?: SortOrder
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
    end_date?: DateTimeFilter<"JetForCharter"> | Date | string
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
    end_date?: SortOrder
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
    end_date?: DateTimeWithAggregatesFilter<"JetForCharter"> | Date | string
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

  export type JetForCharterMessagesWhereInput = {
    AND?: JetForCharterMessagesWhereInput | JetForCharterMessagesWhereInput[]
    OR?: JetForCharterMessagesWhereInput[]
    NOT?: JetForCharterMessagesWhereInput | JetForCharterMessagesWhereInput[]
    id?: UuidFilter<"JetForCharterMessages"> | string
    customerName?: StringFilter<"JetForCharterMessages"> | string
    customerEmail?: StringFilter<"JetForCharterMessages"> | string
    customerCountry?: StringNullableFilter<"JetForCharterMessages"> | string | null
    departureLocation?: StringFilter<"JetForCharterMessages"> | string
    arrivalLocation?: StringFilter<"JetForCharterMessages"> | string
    departureDate?: DateTimeFilter<"JetForCharterMessages"> | Date | string
    returnDate?: DateTimeNullableFilter<"JetForCharterMessages"> | Date | string | null
    passengerCount?: IntFilter<"JetForCharterMessages"> | number
    specialRequests?: StringNullableFilter<"JetForCharterMessages"> | string | null
    listingId?: UuidFilter<"JetForCharterMessages"> | string
    vendorId?: UuidFilter<"JetForCharterMessages"> | string
    createdAt?: DateTimeFilter<"JetForCharterMessages"> | Date | string
    read?: BoolFilter<"JetForCharterMessages"> | boolean
  }

  export type JetForCharterMessagesOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrderInput | SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrderInput | SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForCharterMessagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JetForCharterMessagesWhereInput | JetForCharterMessagesWhereInput[]
    OR?: JetForCharterMessagesWhereInput[]
    NOT?: JetForCharterMessagesWhereInput | JetForCharterMessagesWhereInput[]
    customerName?: StringFilter<"JetForCharterMessages"> | string
    customerEmail?: StringFilter<"JetForCharterMessages"> | string
    customerCountry?: StringNullableFilter<"JetForCharterMessages"> | string | null
    departureLocation?: StringFilter<"JetForCharterMessages"> | string
    arrivalLocation?: StringFilter<"JetForCharterMessages"> | string
    departureDate?: DateTimeFilter<"JetForCharterMessages"> | Date | string
    returnDate?: DateTimeNullableFilter<"JetForCharterMessages"> | Date | string | null
    passengerCount?: IntFilter<"JetForCharterMessages"> | number
    specialRequests?: StringNullableFilter<"JetForCharterMessages"> | string | null
    listingId?: UuidFilter<"JetForCharterMessages"> | string
    vendorId?: UuidFilter<"JetForCharterMessages"> | string
    createdAt?: DateTimeFilter<"JetForCharterMessages"> | Date | string
    read?: BoolFilter<"JetForCharterMessages"> | boolean
  }, "id">

  export type JetForCharterMessagesOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrderInput | SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrderInput | SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    _count?: JetForCharterMessagesCountOrderByAggregateInput
    _avg?: JetForCharterMessagesAvgOrderByAggregateInput
    _max?: JetForCharterMessagesMaxOrderByAggregateInput
    _min?: JetForCharterMessagesMinOrderByAggregateInput
    _sum?: JetForCharterMessagesSumOrderByAggregateInput
  }

  export type JetForCharterMessagesScalarWhereWithAggregatesInput = {
    AND?: JetForCharterMessagesScalarWhereWithAggregatesInput | JetForCharterMessagesScalarWhereWithAggregatesInput[]
    OR?: JetForCharterMessagesScalarWhereWithAggregatesInput[]
    NOT?: JetForCharterMessagesScalarWhereWithAggregatesInput | JetForCharterMessagesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"JetForCharterMessages"> | string
    customerName?: StringWithAggregatesFilter<"JetForCharterMessages"> | string
    customerEmail?: StringWithAggregatesFilter<"JetForCharterMessages"> | string
    customerCountry?: StringNullableWithAggregatesFilter<"JetForCharterMessages"> | string | null
    departureLocation?: StringWithAggregatesFilter<"JetForCharterMessages"> | string
    arrivalLocation?: StringWithAggregatesFilter<"JetForCharterMessages"> | string
    departureDate?: DateTimeWithAggregatesFilter<"JetForCharterMessages"> | Date | string
    returnDate?: DateTimeNullableWithAggregatesFilter<"JetForCharterMessages"> | Date | string | null
    passengerCount?: IntWithAggregatesFilter<"JetForCharterMessages"> | number
    specialRequests?: StringNullableWithAggregatesFilter<"JetForCharterMessages"> | string | null
    listingId?: UuidWithAggregatesFilter<"JetForCharterMessages"> | string
    vendorId?: UuidWithAggregatesFilter<"JetForCharterMessages"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JetForCharterMessages"> | Date | string
    read?: BoolWithAggregatesFilter<"JetForCharterMessages"> | boolean
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

  export type HelicopterForSaleListingWhereInput = {
    AND?: HelicopterForSaleListingWhereInput | HelicopterForSaleListingWhereInput[]
    OR?: HelicopterForSaleListingWhereInput[]
    NOT?: HelicopterForSaleListingWhereInput | HelicopterForSaleListingWhereInput[]
    id?: UuidFilter<"HelicopterForSaleListing"> | string
    createdAt?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    updatedAt?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    helicopterName?: StringFilter<"HelicopterForSaleListing"> | string
    helicopterType?: StringFilter<"HelicopterForSaleListing"> | string
    manufacturer?: StringFilter<"HelicopterForSaleListing"> | string
    yearOfManufacture?: IntFilter<"HelicopterForSaleListing"> | number
    registrationNumber?: StringFilter<"HelicopterForSaleListing"> | string
    serialNumber?: StringFilter<"HelicopterForSaleListing"> | string
    seatingCapacity?: IntFilter<"HelicopterForSaleListing"> | number
    maximumRange?: FloatFilter<"HelicopterForSaleListing"> | number
    cruisingSpeed?: FloatFilter<"HelicopterForSaleListing"> | number
    baggageCapacity?: StringFilter<"HelicopterForSaleListing"> | string
    condition?: StringFilter<"HelicopterForSaleListing"> | string
    totalFlightHours?: FloatFilter<"HelicopterForSaleListing"> | number
    maintenanceHistory?: StringFilter<"HelicopterForSaleListing"> | string
    lastInspection?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    salePrice?: FloatFilter<"HelicopterForSaleListing"> | number
    discounts?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    avionics?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    emergencyEquipment?: BoolFilter<"HelicopterForSaleListing"> | boolean
    cargoHook?: BoolFilter<"HelicopterForSaleListing"> | boolean
    videoLink?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    exteriorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    interiorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    additionalEquipment?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    transactionSignature?: StringFilter<"HelicopterForSaleListing"> | string
    transactionLink?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    vendorId?: UuidFilter<"HelicopterForSaleListing"> | string
    views?: IntFilter<"HelicopterForSaleListing"> | number
    status?: StringFilter<"HelicopterForSaleListing"> | string
    sponsored?: BoolFilter<"HelicopterForSaleListing"> | boolean
    sponsoredType?: StringFilter<"HelicopterForSaleListing"> | string
    endDate?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    cabinFeatures?: CabinFeatureListRelationFilter
  }

  export type HelicopterForSaleListingOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    helicopterName?: SortOrder
    helicopterType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    serialNumber?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    condition?: SortOrder
    totalFlightHours?: SortOrder
    maintenanceHistory?: SortOrder
    lastInspection?: SortOrder
    salePrice?: SortOrder
    discounts?: SortOrderInput | SortOrder
    avionics?: SortOrderInput | SortOrder
    emergencyEquipment?: SortOrder
    cargoHook?: SortOrder
    videoLink?: SortOrderInput | SortOrder
    exteriorImageUrls?: SortOrder
    interiorImageUrls?: SortOrder
    additionalEquipment?: SortOrderInput | SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
    cabinFeatures?: CabinFeatureOrderByRelationAggregateInput
  }

  export type HelicopterForSaleListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registrationNumber?: string
    serialNumber?: string
    AND?: HelicopterForSaleListingWhereInput | HelicopterForSaleListingWhereInput[]
    OR?: HelicopterForSaleListingWhereInput[]
    NOT?: HelicopterForSaleListingWhereInput | HelicopterForSaleListingWhereInput[]
    createdAt?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    updatedAt?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    helicopterName?: StringFilter<"HelicopterForSaleListing"> | string
    helicopterType?: StringFilter<"HelicopterForSaleListing"> | string
    manufacturer?: StringFilter<"HelicopterForSaleListing"> | string
    yearOfManufacture?: IntFilter<"HelicopterForSaleListing"> | number
    seatingCapacity?: IntFilter<"HelicopterForSaleListing"> | number
    maximumRange?: FloatFilter<"HelicopterForSaleListing"> | number
    cruisingSpeed?: FloatFilter<"HelicopterForSaleListing"> | number
    baggageCapacity?: StringFilter<"HelicopterForSaleListing"> | string
    condition?: StringFilter<"HelicopterForSaleListing"> | string
    totalFlightHours?: FloatFilter<"HelicopterForSaleListing"> | number
    maintenanceHistory?: StringFilter<"HelicopterForSaleListing"> | string
    lastInspection?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    salePrice?: FloatFilter<"HelicopterForSaleListing"> | number
    discounts?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    avionics?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    emergencyEquipment?: BoolFilter<"HelicopterForSaleListing"> | boolean
    cargoHook?: BoolFilter<"HelicopterForSaleListing"> | boolean
    videoLink?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    exteriorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    interiorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    additionalEquipment?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    transactionSignature?: StringFilter<"HelicopterForSaleListing"> | string
    transactionLink?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    vendorId?: UuidFilter<"HelicopterForSaleListing"> | string
    views?: IntFilter<"HelicopterForSaleListing"> | number
    status?: StringFilter<"HelicopterForSaleListing"> | string
    sponsored?: BoolFilter<"HelicopterForSaleListing"> | boolean
    sponsoredType?: StringFilter<"HelicopterForSaleListing"> | string
    endDate?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    cabinFeatures?: CabinFeatureListRelationFilter
  }, "id" | "registrationNumber" | "serialNumber">

  export type HelicopterForSaleListingOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    helicopterName?: SortOrder
    helicopterType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    serialNumber?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    condition?: SortOrder
    totalFlightHours?: SortOrder
    maintenanceHistory?: SortOrder
    lastInspection?: SortOrder
    salePrice?: SortOrder
    discounts?: SortOrderInput | SortOrder
    avionics?: SortOrderInput | SortOrder
    emergencyEquipment?: SortOrder
    cargoHook?: SortOrder
    videoLink?: SortOrderInput | SortOrder
    exteriorImageUrls?: SortOrder
    interiorImageUrls?: SortOrder
    additionalEquipment?: SortOrderInput | SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
    _count?: HelicopterForSaleListingCountOrderByAggregateInput
    _avg?: HelicopterForSaleListingAvgOrderByAggregateInput
    _max?: HelicopterForSaleListingMaxOrderByAggregateInput
    _min?: HelicopterForSaleListingMinOrderByAggregateInput
    _sum?: HelicopterForSaleListingSumOrderByAggregateInput
  }

  export type HelicopterForSaleListingScalarWhereWithAggregatesInput = {
    AND?: HelicopterForSaleListingScalarWhereWithAggregatesInput | HelicopterForSaleListingScalarWhereWithAggregatesInput[]
    OR?: HelicopterForSaleListingScalarWhereWithAggregatesInput[]
    NOT?: HelicopterForSaleListingScalarWhereWithAggregatesInput | HelicopterForSaleListingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"HelicopterForSaleListing"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HelicopterForSaleListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HelicopterForSaleListing"> | Date | string
    helicopterName?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    helicopterType?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    manufacturer?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    yearOfManufacture?: IntWithAggregatesFilter<"HelicopterForSaleListing"> | number
    registrationNumber?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    serialNumber?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    seatingCapacity?: IntWithAggregatesFilter<"HelicopterForSaleListing"> | number
    maximumRange?: FloatWithAggregatesFilter<"HelicopterForSaleListing"> | number
    cruisingSpeed?: FloatWithAggregatesFilter<"HelicopterForSaleListing"> | number
    baggageCapacity?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    condition?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    totalFlightHours?: FloatWithAggregatesFilter<"HelicopterForSaleListing"> | number
    maintenanceHistory?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    lastInspection?: DateTimeWithAggregatesFilter<"HelicopterForSaleListing"> | Date | string
    salePrice?: FloatWithAggregatesFilter<"HelicopterForSaleListing"> | number
    discounts?: StringNullableWithAggregatesFilter<"HelicopterForSaleListing"> | string | null
    avionics?: StringNullableWithAggregatesFilter<"HelicopterForSaleListing"> | string | null
    emergencyEquipment?: BoolWithAggregatesFilter<"HelicopterForSaleListing"> | boolean
    cargoHook?: BoolWithAggregatesFilter<"HelicopterForSaleListing"> | boolean
    videoLink?: StringNullableWithAggregatesFilter<"HelicopterForSaleListing"> | string | null
    exteriorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    interiorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    additionalEquipment?: StringNullableWithAggregatesFilter<"HelicopterForSaleListing"> | string | null
    transactionSignature?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    transactionLink?: StringNullableWithAggregatesFilter<"HelicopterForSaleListing"> | string | null
    vendorId?: UuidWithAggregatesFilter<"HelicopterForSaleListing"> | string
    views?: IntWithAggregatesFilter<"HelicopterForSaleListing"> | number
    status?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    sponsored?: BoolWithAggregatesFilter<"HelicopterForSaleListing"> | boolean
    sponsoredType?: StringWithAggregatesFilter<"HelicopterForSaleListing"> | string
    endDate?: DateTimeWithAggregatesFilter<"HelicopterForSaleListing"> | Date | string
  }

  export type CabinFeatureWhereInput = {
    AND?: CabinFeatureWhereInput | CabinFeatureWhereInput[]
    OR?: CabinFeatureWhereInput[]
    NOT?: CabinFeatureWhereInput | CabinFeatureWhereInput[]
    id?: UuidFilter<"CabinFeature"> | string
    createdAt?: DateTimeFilter<"CabinFeature"> | Date | string
    updatedAt?: DateTimeFilter<"CabinFeature"> | Date | string
    name?: StringFilter<"CabinFeature"> | string
    helicopters?: HelicopterForSaleListingListRelationFilter
  }

  export type CabinFeatureOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    helicopters?: HelicopterForSaleListingOrderByRelationAggregateInput
  }

  export type CabinFeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CabinFeatureWhereInput | CabinFeatureWhereInput[]
    OR?: CabinFeatureWhereInput[]
    NOT?: CabinFeatureWhereInput | CabinFeatureWhereInput[]
    createdAt?: DateTimeFilter<"CabinFeature"> | Date | string
    updatedAt?: DateTimeFilter<"CabinFeature"> | Date | string
    helicopters?: HelicopterForSaleListingListRelationFilter
  }, "id" | "name">

  export type CabinFeatureOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    _count?: CabinFeatureCountOrderByAggregateInput
    _max?: CabinFeatureMaxOrderByAggregateInput
    _min?: CabinFeatureMinOrderByAggregateInput
  }

  export type CabinFeatureScalarWhereWithAggregatesInput = {
    AND?: CabinFeatureScalarWhereWithAggregatesInput | CabinFeatureScalarWhereWithAggregatesInput[]
    OR?: CabinFeatureScalarWhereWithAggregatesInput[]
    NOT?: CabinFeatureScalarWhereWithAggregatesInput | CabinFeatureScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CabinFeature"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CabinFeature"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CabinFeature"> | Date | string
    name?: StringWithAggregatesFilter<"CabinFeature"> | string
  }

  export type HelicopterMessageWhereInput = {
    AND?: HelicopterMessageWhereInput | HelicopterMessageWhereInput[]
    OR?: HelicopterMessageWhereInput[]
    NOT?: HelicopterMessageWhereInput | HelicopterMessageWhereInput[]
    id?: UuidFilter<"HelicopterMessage"> | string
    createdAt?: DateTimeFilter<"HelicopterMessage"> | Date | string
    customerName?: StringFilter<"HelicopterMessage"> | string
    customerEmail?: StringFilter<"HelicopterMessage"> | string
    customerCountry?: StringNullableFilter<"HelicopterMessage"> | string | null
    listingId?: UuidFilter<"HelicopterMessage"> | string
    vendorId?: UuidFilter<"HelicopterMessage"> | string
    message?: StringFilter<"HelicopterMessage"> | string
    read?: BoolFilter<"HelicopterMessage"> | boolean
  }

  export type HelicopterMessageOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrderInput | SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    read?: SortOrder
  }

  export type HelicopterMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HelicopterMessageWhereInput | HelicopterMessageWhereInput[]
    OR?: HelicopterMessageWhereInput[]
    NOT?: HelicopterMessageWhereInput | HelicopterMessageWhereInput[]
    createdAt?: DateTimeFilter<"HelicopterMessage"> | Date | string
    customerName?: StringFilter<"HelicopterMessage"> | string
    customerEmail?: StringFilter<"HelicopterMessage"> | string
    customerCountry?: StringNullableFilter<"HelicopterMessage"> | string | null
    listingId?: UuidFilter<"HelicopterMessage"> | string
    vendorId?: UuidFilter<"HelicopterMessage"> | string
    message?: StringFilter<"HelicopterMessage"> | string
    read?: BoolFilter<"HelicopterMessage"> | boolean
  }, "id">

  export type HelicopterMessageOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrderInput | SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    read?: SortOrder
    _count?: HelicopterMessageCountOrderByAggregateInput
    _max?: HelicopterMessageMaxOrderByAggregateInput
    _min?: HelicopterMessageMinOrderByAggregateInput
  }

  export type HelicopterMessageScalarWhereWithAggregatesInput = {
    AND?: HelicopterMessageScalarWhereWithAggregatesInput | HelicopterMessageScalarWhereWithAggregatesInput[]
    OR?: HelicopterMessageScalarWhereWithAggregatesInput[]
    NOT?: HelicopterMessageScalarWhereWithAggregatesInput | HelicopterMessageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"HelicopterMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HelicopterMessage"> | Date | string
    customerName?: StringWithAggregatesFilter<"HelicopterMessage"> | string
    customerEmail?: StringWithAggregatesFilter<"HelicopterMessage"> | string
    customerCountry?: StringNullableWithAggregatesFilter<"HelicopterMessage"> | string | null
    listingId?: UuidWithAggregatesFilter<"HelicopterMessage"> | string
    vendorId?: UuidWithAggregatesFilter<"HelicopterMessage"> | string
    message?: StringWithAggregatesFilter<"HelicopterMessage"> | string
    read?: BoolWithAggregatesFilter<"HelicopterMessage"> | boolean
  }

  export type HelicopterForCharterWhereInput = {
    AND?: HelicopterForCharterWhereInput | HelicopterForCharterWhereInput[]
    OR?: HelicopterForCharterWhereInput[]
    NOT?: HelicopterForCharterWhereInput | HelicopterForCharterWhereInput[]
    id?: UuidFilter<"HelicopterForCharter"> | string
    createdAt?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    updatedAt?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    model?: StringFilter<"HelicopterForCharter"> | string
    year?: IntFilter<"HelicopterForCharter"> | number
    capacity?: IntFilter<"HelicopterForCharter"> | number
    range?: FloatFilter<"HelicopterForCharter"> | number
    pricePerHour?: FloatFilter<"HelicopterForCharter"> | number
    location?: StringFilter<"HelicopterForCharter"> | string
    availableFrom?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    availableTo?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    description?: StringNullableFilter<"HelicopterForCharter"> | string | null
    registrationNumber?: StringFilter<"HelicopterForCharter"> | string
    engineType?: StringFilter<"HelicopterForCharter"> | string
    engineCount?: IntFilter<"HelicopterForCharter"> | number
    maxSpeed?: FloatFilter<"HelicopterForCharter"> | number
    cruisingSpeed?: FloatFilter<"HelicopterForCharter"> | number
    fuelCapacity?: FloatFilter<"HelicopterForCharter"> | number
    maxAltitude?: FloatFilter<"HelicopterForCharter"> | number
    flightHours?: FloatNullableFilter<"HelicopterForCharter"> | number | null
    lastOverhaul?: DateTimeNullableFilter<"HelicopterForCharter"> | Date | string | null
    airworthinessCertificate?: StringFilter<"HelicopterForCharter"> | string
    lastMaintenanceDate?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    insuranceStatus?: StringFilter<"HelicopterForCharter"> | string
    pilotQualifications?: StringFilter<"HelicopterForCharter"> | string
    safetyFeatures?: StringNullableListFilter<"HelicopterForCharter">
    hasWifi?: BoolFilter<"HelicopterForCharter"> | boolean
    hasRefreshments?: BoolFilter<"HelicopterForCharter"> | boolean
    hasEntertainmentSystem?: BoolFilter<"HelicopterForCharter"> | boolean
    hasClimatControl?: BoolFilter<"HelicopterForCharter"> | boolean
    depositAmount?: FloatFilter<"HelicopterForCharter"> | number
    minimumHours?: FloatFilter<"HelicopterForCharter"> | number
    cancellationPolicy?: StringFilter<"HelicopterForCharter"> | string
    packageDeals?: StringNullableFilter<"HelicopterForCharter"> | string | null
    imageUrls?: StringNullableListFilter<"HelicopterForCharter">
    transactionSignature?: StringFilter<"HelicopterForCharter"> | string
    transactionLink?: StringNullableFilter<"HelicopterForCharter"> | string | null
    vendorId?: UuidFilter<"HelicopterForCharter"> | string
    status?: StringFilter<"HelicopterForCharter"> | string
    views?: IntFilter<"HelicopterForCharter"> | number
    sponsored?: BoolFilter<"HelicopterForCharter"> | boolean
    sponsoredType?: StringFilter<"HelicopterForCharter"> | string
    endDate?: DateTimeFilter<"HelicopterForCharter"> | Date | string
  }

  export type HelicopterForCharterOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: SortOrder
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    location?: SortOrder
    availableFrom?: SortOrder
    availableTo?: SortOrder
    description?: SortOrderInput | SortOrder
    registrationNumber?: SortOrder
    engineType?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrderInput | SortOrder
    lastOverhaul?: SortOrderInput | SortOrder
    airworthinessCertificate?: SortOrder
    lastMaintenanceDate?: SortOrder
    insuranceStatus?: SortOrder
    pilotQualifications?: SortOrder
    safetyFeatures?: SortOrder
    hasWifi?: SortOrder
    hasRefreshments?: SortOrder
    hasEntertainmentSystem?: SortOrder
    hasClimatControl?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    cancellationPolicy?: SortOrder
    packageDeals?: SortOrderInput | SortOrder
    imageUrls?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    status?: SortOrder
    views?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForCharterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registrationNumber?: string
    AND?: HelicopterForCharterWhereInput | HelicopterForCharterWhereInput[]
    OR?: HelicopterForCharterWhereInput[]
    NOT?: HelicopterForCharterWhereInput | HelicopterForCharterWhereInput[]
    createdAt?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    updatedAt?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    model?: StringFilter<"HelicopterForCharter"> | string
    year?: IntFilter<"HelicopterForCharter"> | number
    capacity?: IntFilter<"HelicopterForCharter"> | number
    range?: FloatFilter<"HelicopterForCharter"> | number
    pricePerHour?: FloatFilter<"HelicopterForCharter"> | number
    location?: StringFilter<"HelicopterForCharter"> | string
    availableFrom?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    availableTo?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    description?: StringNullableFilter<"HelicopterForCharter"> | string | null
    engineType?: StringFilter<"HelicopterForCharter"> | string
    engineCount?: IntFilter<"HelicopterForCharter"> | number
    maxSpeed?: FloatFilter<"HelicopterForCharter"> | number
    cruisingSpeed?: FloatFilter<"HelicopterForCharter"> | number
    fuelCapacity?: FloatFilter<"HelicopterForCharter"> | number
    maxAltitude?: FloatFilter<"HelicopterForCharter"> | number
    flightHours?: FloatNullableFilter<"HelicopterForCharter"> | number | null
    lastOverhaul?: DateTimeNullableFilter<"HelicopterForCharter"> | Date | string | null
    airworthinessCertificate?: StringFilter<"HelicopterForCharter"> | string
    lastMaintenanceDate?: DateTimeFilter<"HelicopterForCharter"> | Date | string
    insuranceStatus?: StringFilter<"HelicopterForCharter"> | string
    pilotQualifications?: StringFilter<"HelicopterForCharter"> | string
    safetyFeatures?: StringNullableListFilter<"HelicopterForCharter">
    hasWifi?: BoolFilter<"HelicopterForCharter"> | boolean
    hasRefreshments?: BoolFilter<"HelicopterForCharter"> | boolean
    hasEntertainmentSystem?: BoolFilter<"HelicopterForCharter"> | boolean
    hasClimatControl?: BoolFilter<"HelicopterForCharter"> | boolean
    depositAmount?: FloatFilter<"HelicopterForCharter"> | number
    minimumHours?: FloatFilter<"HelicopterForCharter"> | number
    cancellationPolicy?: StringFilter<"HelicopterForCharter"> | string
    packageDeals?: StringNullableFilter<"HelicopterForCharter"> | string | null
    imageUrls?: StringNullableListFilter<"HelicopterForCharter">
    transactionSignature?: StringFilter<"HelicopterForCharter"> | string
    transactionLink?: StringNullableFilter<"HelicopterForCharter"> | string | null
    vendorId?: UuidFilter<"HelicopterForCharter"> | string
    status?: StringFilter<"HelicopterForCharter"> | string
    views?: IntFilter<"HelicopterForCharter"> | number
    sponsored?: BoolFilter<"HelicopterForCharter"> | boolean
    sponsoredType?: StringFilter<"HelicopterForCharter"> | string
    endDate?: DateTimeFilter<"HelicopterForCharter"> | Date | string
  }, "id" | "registrationNumber">

  export type HelicopterForCharterOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: SortOrder
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    location?: SortOrder
    availableFrom?: SortOrder
    availableTo?: SortOrder
    description?: SortOrderInput | SortOrder
    registrationNumber?: SortOrder
    engineType?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrderInput | SortOrder
    lastOverhaul?: SortOrderInput | SortOrder
    airworthinessCertificate?: SortOrder
    lastMaintenanceDate?: SortOrder
    insuranceStatus?: SortOrder
    pilotQualifications?: SortOrder
    safetyFeatures?: SortOrder
    hasWifi?: SortOrder
    hasRefreshments?: SortOrder
    hasEntertainmentSystem?: SortOrder
    hasClimatControl?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    cancellationPolicy?: SortOrder
    packageDeals?: SortOrderInput | SortOrder
    imageUrls?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrderInput | SortOrder
    vendorId?: SortOrder
    status?: SortOrder
    views?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
    _count?: HelicopterForCharterCountOrderByAggregateInput
    _avg?: HelicopterForCharterAvgOrderByAggregateInput
    _max?: HelicopterForCharterMaxOrderByAggregateInput
    _min?: HelicopterForCharterMinOrderByAggregateInput
    _sum?: HelicopterForCharterSumOrderByAggregateInput
  }

  export type HelicopterForCharterScalarWhereWithAggregatesInput = {
    AND?: HelicopterForCharterScalarWhereWithAggregatesInput | HelicopterForCharterScalarWhereWithAggregatesInput[]
    OR?: HelicopterForCharterScalarWhereWithAggregatesInput[]
    NOT?: HelicopterForCharterScalarWhereWithAggregatesInput | HelicopterForCharterScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"HelicopterForCharter"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HelicopterForCharter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HelicopterForCharter"> | Date | string
    model?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    year?: IntWithAggregatesFilter<"HelicopterForCharter"> | number
    capacity?: IntWithAggregatesFilter<"HelicopterForCharter"> | number
    range?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    pricePerHour?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    location?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    availableFrom?: DateTimeWithAggregatesFilter<"HelicopterForCharter"> | Date | string
    availableTo?: DateTimeWithAggregatesFilter<"HelicopterForCharter"> | Date | string
    description?: StringNullableWithAggregatesFilter<"HelicopterForCharter"> | string | null
    registrationNumber?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    engineType?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    engineCount?: IntWithAggregatesFilter<"HelicopterForCharter"> | number
    maxSpeed?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    cruisingSpeed?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    fuelCapacity?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    maxAltitude?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    flightHours?: FloatNullableWithAggregatesFilter<"HelicopterForCharter"> | number | null
    lastOverhaul?: DateTimeNullableWithAggregatesFilter<"HelicopterForCharter"> | Date | string | null
    airworthinessCertificate?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    lastMaintenanceDate?: DateTimeWithAggregatesFilter<"HelicopterForCharter"> | Date | string
    insuranceStatus?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    pilotQualifications?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    safetyFeatures?: StringNullableListFilter<"HelicopterForCharter">
    hasWifi?: BoolWithAggregatesFilter<"HelicopterForCharter"> | boolean
    hasRefreshments?: BoolWithAggregatesFilter<"HelicopterForCharter"> | boolean
    hasEntertainmentSystem?: BoolWithAggregatesFilter<"HelicopterForCharter"> | boolean
    hasClimatControl?: BoolWithAggregatesFilter<"HelicopterForCharter"> | boolean
    depositAmount?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    minimumHours?: FloatWithAggregatesFilter<"HelicopterForCharter"> | number
    cancellationPolicy?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    packageDeals?: StringNullableWithAggregatesFilter<"HelicopterForCharter"> | string | null
    imageUrls?: StringNullableListFilter<"HelicopterForCharter">
    transactionSignature?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    transactionLink?: StringNullableWithAggregatesFilter<"HelicopterForCharter"> | string | null
    vendorId?: UuidWithAggregatesFilter<"HelicopterForCharter"> | string
    status?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    views?: IntWithAggregatesFilter<"HelicopterForCharter"> | number
    sponsored?: BoolWithAggregatesFilter<"HelicopterForCharter"> | boolean
    sponsoredType?: StringWithAggregatesFilter<"HelicopterForCharter"> | string
    endDate?: DateTimeWithAggregatesFilter<"HelicopterForCharter"> | Date | string
  }

  export type HelicopterForCharterMessagesWhereInput = {
    AND?: HelicopterForCharterMessagesWhereInput | HelicopterForCharterMessagesWhereInput[]
    OR?: HelicopterForCharterMessagesWhereInput[]
    NOT?: HelicopterForCharterMessagesWhereInput | HelicopterForCharterMessagesWhereInput[]
    id?: UuidFilter<"HelicopterForCharterMessages"> | string
    customerName?: StringFilter<"HelicopterForCharterMessages"> | string
    customerEmail?: StringFilter<"HelicopterForCharterMessages"> | string
    customerCountry?: StringNullableFilter<"HelicopterForCharterMessages"> | string | null
    departureLocation?: StringFilter<"HelicopterForCharterMessages"> | string
    arrivalLocation?: StringFilter<"HelicopterForCharterMessages"> | string
    departureDate?: DateTimeFilter<"HelicopterForCharterMessages"> | Date | string
    returnDate?: DateTimeNullableFilter<"HelicopterForCharterMessages"> | Date | string | null
    passengerCount?: IntFilter<"HelicopterForCharterMessages"> | number
    specialRequests?: StringNullableFilter<"HelicopterForCharterMessages"> | string | null
    listingId?: UuidFilter<"HelicopterForCharterMessages"> | string
    vendorId?: UuidFilter<"HelicopterForCharterMessages"> | string
    createdAt?: DateTimeFilter<"HelicopterForCharterMessages"> | Date | string
    read?: BoolFilter<"HelicopterForCharterMessages"> | boolean
  }

  export type HelicopterForCharterMessagesOrderByWithRelationInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrderInput | SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrderInput | SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type HelicopterForCharterMessagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HelicopterForCharterMessagesWhereInput | HelicopterForCharterMessagesWhereInput[]
    OR?: HelicopterForCharterMessagesWhereInput[]
    NOT?: HelicopterForCharterMessagesWhereInput | HelicopterForCharterMessagesWhereInput[]
    customerName?: StringFilter<"HelicopterForCharterMessages"> | string
    customerEmail?: StringFilter<"HelicopterForCharterMessages"> | string
    customerCountry?: StringNullableFilter<"HelicopterForCharterMessages"> | string | null
    departureLocation?: StringFilter<"HelicopterForCharterMessages"> | string
    arrivalLocation?: StringFilter<"HelicopterForCharterMessages"> | string
    departureDate?: DateTimeFilter<"HelicopterForCharterMessages"> | Date | string
    returnDate?: DateTimeNullableFilter<"HelicopterForCharterMessages"> | Date | string | null
    passengerCount?: IntFilter<"HelicopterForCharterMessages"> | number
    specialRequests?: StringNullableFilter<"HelicopterForCharterMessages"> | string | null
    listingId?: UuidFilter<"HelicopterForCharterMessages"> | string
    vendorId?: UuidFilter<"HelicopterForCharterMessages"> | string
    createdAt?: DateTimeFilter<"HelicopterForCharterMessages"> | Date | string
    read?: BoolFilter<"HelicopterForCharterMessages"> | boolean
  }, "id">

  export type HelicopterForCharterMessagesOrderByWithAggregationInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrderInput | SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrderInput | SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrderInput | SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
    _count?: HelicopterForCharterMessagesCountOrderByAggregateInput
    _avg?: HelicopterForCharterMessagesAvgOrderByAggregateInput
    _max?: HelicopterForCharterMessagesMaxOrderByAggregateInput
    _min?: HelicopterForCharterMessagesMinOrderByAggregateInput
    _sum?: HelicopterForCharterMessagesSumOrderByAggregateInput
  }

  export type HelicopterForCharterMessagesScalarWhereWithAggregatesInput = {
    AND?: HelicopterForCharterMessagesScalarWhereWithAggregatesInput | HelicopterForCharterMessagesScalarWhereWithAggregatesInput[]
    OR?: HelicopterForCharterMessagesScalarWhereWithAggregatesInput[]
    NOT?: HelicopterForCharterMessagesScalarWhereWithAggregatesInput | HelicopterForCharterMessagesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    customerName?: StringWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    customerEmail?: StringWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    customerCountry?: StringNullableWithAggregatesFilter<"HelicopterForCharterMessages"> | string | null
    departureLocation?: StringWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    arrivalLocation?: StringWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    departureDate?: DateTimeWithAggregatesFilter<"HelicopterForCharterMessages"> | Date | string
    returnDate?: DateTimeNullableWithAggregatesFilter<"HelicopterForCharterMessages"> | Date | string | null
    passengerCount?: IntWithAggregatesFilter<"HelicopterForCharterMessages"> | number
    specialRequests?: StringNullableWithAggregatesFilter<"HelicopterForCharterMessages"> | string | null
    listingId?: UuidWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    vendorId?: UuidWithAggregatesFilter<"HelicopterForCharterMessages"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HelicopterForCharterMessages"> | Date | string
    read?: BoolWithAggregatesFilter<"HelicopterForCharterMessages"> | boolean
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
    end_date?: Date | string
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
    end_date?: Date | string
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
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
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
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
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
    end_date?: Date | string
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
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
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
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type JetForCharterMessagesCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date | string
    returnDate?: Date | string | null
    passengerCount: number
    specialRequests?: string | null
    listingId: string
    vendorId: string
    createdAt?: Date | string
    read?: boolean
  }

  export type JetForCharterMessagesUncheckedCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date | string
    returnDate?: Date | string | null
    passengerCount: number
    specialRequests?: string | null
    listingId: string
    vendorId: string
    createdAt?: Date | string
    read?: boolean
  }

  export type JetForCharterMessagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JetForCharterMessagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JetForCharterMessagesCreateManyInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date | string
    returnDate?: Date | string | null
    passengerCount: number
    specialRequests?: string | null
    listingId: string
    vendorId: string
    createdAt?: Date | string
    read?: boolean
  }

  export type JetForCharterMessagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JetForCharterMessagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type WalletCreateInput = {
    id?: string
    wallet?: string
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    wallet?: string
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
    wallet?: string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wallet?: StringFieldUpdateOperationsInput | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    wallet?: StringFieldUpdateOperationsInput | string
  }

  export type HelicopterForSaleListingCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    helicopterName: string
    helicopterType: string
    manufacturer: string
    yearOfManufacture: number
    registrationNumber: string
    serialNumber: string
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: string
    condition: string
    totalFlightHours: number
    maintenanceHistory: string
    lastInspection: Date | string
    salePrice: number
    discounts?: string | null
    avionics?: string | null
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: string | null
    exteriorImageUrls?: HelicopterForSaleListingCreateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingCreateinteriorImageUrlsInput | string[]
    additionalEquipment?: string | null
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
    cabinFeatures?: CabinFeatureCreateNestedManyWithoutHelicoptersInput
  }

  export type HelicopterForSaleListingUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    helicopterName: string
    helicopterType: string
    manufacturer: string
    yearOfManufacture: number
    registrationNumber: string
    serialNumber: string
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: string
    condition: string
    totalFlightHours: number
    maintenanceHistory: string
    lastInspection: Date | string
    salePrice: number
    discounts?: string | null
    avionics?: string | null
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: string | null
    exteriorImageUrls?: HelicopterForSaleListingCreateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingCreateinteriorImageUrlsInput | string[]
    additionalEquipment?: string | null
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
    cabinFeatures?: CabinFeatureUncheckedCreateNestedManyWithoutHelicoptersInput
  }

  export type HelicopterForSaleListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cabinFeatures?: CabinFeatureUpdateManyWithoutHelicoptersNestedInput
  }

  export type HelicopterForSaleListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cabinFeatures?: CabinFeatureUncheckedUpdateManyWithoutHelicoptersNestedInput
  }

  export type HelicopterForSaleListingCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    helicopterName: string
    helicopterType: string
    manufacturer: string
    yearOfManufacture: number
    registrationNumber: string
    serialNumber: string
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: string
    condition: string
    totalFlightHours: number
    maintenanceHistory: string
    lastInspection: Date | string
    salePrice: number
    discounts?: string | null
    avionics?: string | null
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: string | null
    exteriorImageUrls?: HelicopterForSaleListingCreateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingCreateinteriorImageUrlsInput | string[]
    additionalEquipment?: string | null
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
  }

  export type HelicopterForSaleListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForSaleListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CabinFeatureCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    helicopters?: HelicopterForSaleListingCreateNestedManyWithoutCabinFeaturesInput
  }

  export type CabinFeatureUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    helicopters?: HelicopterForSaleListingUncheckedCreateNestedManyWithoutCabinFeaturesInput
  }

  export type CabinFeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    helicopters?: HelicopterForSaleListingUpdateManyWithoutCabinFeaturesNestedInput
  }

  export type CabinFeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    helicopters?: HelicopterForSaleListingUncheckedUpdateManyWithoutCabinFeaturesNestedInput
  }

  export type CabinFeatureCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type CabinFeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CabinFeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type HelicopterMessageCreateInput = {
    id?: string
    createdAt?: Date | string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    listingId: string
    vendorId: string
    message: string
    read?: boolean
  }

  export type HelicopterMessageUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    listingId: string
    vendorId: string
    message: string
    read?: boolean
  }

  export type HelicopterMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterMessageCreateManyInput = {
    id?: string
    createdAt?: Date | string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    listingId: string
    vendorId: string
    message: string
    read?: boolean
  }

  export type HelicopterMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterForCharterCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    model: string
    year: number
    capacity: number
    range: number
    pricePerHour: number
    location: string
    availableFrom: Date | string
    availableTo: Date | string
    description?: string | null
    registrationNumber: string
    engineType: string
    engineCount: number
    maxSpeed: number
    cruisingSpeed: number
    fuelCapacity: number
    maxAltitude: number
    flightHours?: number | null
    lastOverhaul?: Date | string | null
    airworthinessCertificate: string
    lastMaintenanceDate: Date | string
    insuranceStatus: string
    pilotQualifications: string
    safetyFeatures?: HelicopterForCharterCreatesafetyFeaturesInput | string[]
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount: number
    minimumHours: number
    cancellationPolicy: string
    packageDeals?: string | null
    imageUrls?: HelicopterForCharterCreateimageUrlsInput | string[]
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    status?: string
    views?: number
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
  }

  export type HelicopterForCharterUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    model: string
    year: number
    capacity: number
    range: number
    pricePerHour: number
    location: string
    availableFrom: Date | string
    availableTo: Date | string
    description?: string | null
    registrationNumber: string
    engineType: string
    engineCount: number
    maxSpeed: number
    cruisingSpeed: number
    fuelCapacity: number
    maxAltitude: number
    flightHours?: number | null
    lastOverhaul?: Date | string | null
    airworthinessCertificate: string
    lastMaintenanceDate: Date | string
    insuranceStatus: string
    pilotQualifications: string
    safetyFeatures?: HelicopterForCharterCreatesafetyFeaturesInput | string[]
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount: number
    minimumHours: number
    cancellationPolicy: string
    packageDeals?: string | null
    imageUrls?: HelicopterForCharterCreateimageUrlsInput | string[]
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    status?: string
    views?: number
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
  }

  export type HelicopterForCharterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    range?: FloatFieldUpdateOperationsInput | number
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    availableFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTo?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: StringFieldUpdateOperationsInput | string
    engineType?: StringFieldUpdateOperationsInput | string
    engineCount?: IntFieldUpdateOperationsInput | number
    maxSpeed?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    fuelCapacity?: FloatFieldUpdateOperationsInput | number
    maxAltitude?: FloatFieldUpdateOperationsInput | number
    flightHours?: NullableFloatFieldUpdateOperationsInput | number | null
    lastOverhaul?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    airworthinessCertificate?: StringFieldUpdateOperationsInput | string
    lastMaintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceStatus?: StringFieldUpdateOperationsInput | string
    pilotQualifications?: StringFieldUpdateOperationsInput | string
    safetyFeatures?: HelicopterForCharterUpdatesafetyFeaturesInput | string[]
    hasWifi?: BoolFieldUpdateOperationsInput | boolean
    hasRefreshments?: BoolFieldUpdateOperationsInput | boolean
    hasEntertainmentSystem?: BoolFieldUpdateOperationsInput | boolean
    hasClimatControl?: BoolFieldUpdateOperationsInput | boolean
    depositAmount?: FloatFieldUpdateOperationsInput | number
    minimumHours?: FloatFieldUpdateOperationsInput | number
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    packageDeals?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrls?: HelicopterForCharterUpdateimageUrlsInput | string[]
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForCharterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    range?: FloatFieldUpdateOperationsInput | number
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    availableFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTo?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: StringFieldUpdateOperationsInput | string
    engineType?: StringFieldUpdateOperationsInput | string
    engineCount?: IntFieldUpdateOperationsInput | number
    maxSpeed?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    fuelCapacity?: FloatFieldUpdateOperationsInput | number
    maxAltitude?: FloatFieldUpdateOperationsInput | number
    flightHours?: NullableFloatFieldUpdateOperationsInput | number | null
    lastOverhaul?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    airworthinessCertificate?: StringFieldUpdateOperationsInput | string
    lastMaintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceStatus?: StringFieldUpdateOperationsInput | string
    pilotQualifications?: StringFieldUpdateOperationsInput | string
    safetyFeatures?: HelicopterForCharterUpdatesafetyFeaturesInput | string[]
    hasWifi?: BoolFieldUpdateOperationsInput | boolean
    hasRefreshments?: BoolFieldUpdateOperationsInput | boolean
    hasEntertainmentSystem?: BoolFieldUpdateOperationsInput | boolean
    hasClimatControl?: BoolFieldUpdateOperationsInput | boolean
    depositAmount?: FloatFieldUpdateOperationsInput | number
    minimumHours?: FloatFieldUpdateOperationsInput | number
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    packageDeals?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrls?: HelicopterForCharterUpdateimageUrlsInput | string[]
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForCharterCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    model: string
    year: number
    capacity: number
    range: number
    pricePerHour: number
    location: string
    availableFrom: Date | string
    availableTo: Date | string
    description?: string | null
    registrationNumber: string
    engineType: string
    engineCount: number
    maxSpeed: number
    cruisingSpeed: number
    fuelCapacity: number
    maxAltitude: number
    flightHours?: number | null
    lastOverhaul?: Date | string | null
    airworthinessCertificate: string
    lastMaintenanceDate: Date | string
    insuranceStatus: string
    pilotQualifications: string
    safetyFeatures?: HelicopterForCharterCreatesafetyFeaturesInput | string[]
    hasWifi?: boolean
    hasRefreshments?: boolean
    hasEntertainmentSystem?: boolean
    hasClimatControl?: boolean
    depositAmount: number
    minimumHours: number
    cancellationPolicy: string
    packageDeals?: string | null
    imageUrls?: HelicopterForCharterCreateimageUrlsInput | string[]
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    status?: string
    views?: number
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
  }

  export type HelicopterForCharterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    range?: FloatFieldUpdateOperationsInput | number
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    availableFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTo?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: StringFieldUpdateOperationsInput | string
    engineType?: StringFieldUpdateOperationsInput | string
    engineCount?: IntFieldUpdateOperationsInput | number
    maxSpeed?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    fuelCapacity?: FloatFieldUpdateOperationsInput | number
    maxAltitude?: FloatFieldUpdateOperationsInput | number
    flightHours?: NullableFloatFieldUpdateOperationsInput | number | null
    lastOverhaul?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    airworthinessCertificate?: StringFieldUpdateOperationsInput | string
    lastMaintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceStatus?: StringFieldUpdateOperationsInput | string
    pilotQualifications?: StringFieldUpdateOperationsInput | string
    safetyFeatures?: HelicopterForCharterUpdatesafetyFeaturesInput | string[]
    hasWifi?: BoolFieldUpdateOperationsInput | boolean
    hasRefreshments?: BoolFieldUpdateOperationsInput | boolean
    hasEntertainmentSystem?: BoolFieldUpdateOperationsInput | boolean
    hasClimatControl?: BoolFieldUpdateOperationsInput | boolean
    depositAmount?: FloatFieldUpdateOperationsInput | number
    minimumHours?: FloatFieldUpdateOperationsInput | number
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    packageDeals?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrls?: HelicopterForCharterUpdateimageUrlsInput | string[]
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForCharterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    capacity?: IntFieldUpdateOperationsInput | number
    range?: FloatFieldUpdateOperationsInput | number
    pricePerHour?: FloatFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    availableFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    availableTo?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: StringFieldUpdateOperationsInput | string
    engineType?: StringFieldUpdateOperationsInput | string
    engineCount?: IntFieldUpdateOperationsInput | number
    maxSpeed?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    fuelCapacity?: FloatFieldUpdateOperationsInput | number
    maxAltitude?: FloatFieldUpdateOperationsInput | number
    flightHours?: NullableFloatFieldUpdateOperationsInput | number | null
    lastOverhaul?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    airworthinessCertificate?: StringFieldUpdateOperationsInput | string
    lastMaintenanceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    insuranceStatus?: StringFieldUpdateOperationsInput | string
    pilotQualifications?: StringFieldUpdateOperationsInput | string
    safetyFeatures?: HelicopterForCharterUpdatesafetyFeaturesInput | string[]
    hasWifi?: BoolFieldUpdateOperationsInput | boolean
    hasRefreshments?: BoolFieldUpdateOperationsInput | boolean
    hasEntertainmentSystem?: BoolFieldUpdateOperationsInput | boolean
    hasClimatControl?: BoolFieldUpdateOperationsInput | boolean
    depositAmount?: FloatFieldUpdateOperationsInput | number
    minimumHours?: FloatFieldUpdateOperationsInput | number
    cancellationPolicy?: StringFieldUpdateOperationsInput | string
    packageDeals?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrls?: HelicopterForCharterUpdateimageUrlsInput | string[]
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForCharterMessagesCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date | string
    returnDate?: Date | string | null
    passengerCount: number
    specialRequests?: string | null
    listingId: string
    vendorId: string
    createdAt?: Date | string
    read?: boolean
  }

  export type HelicopterForCharterMessagesUncheckedCreateInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date | string
    returnDate?: Date | string | null
    passengerCount: number
    specialRequests?: string | null
    listingId: string
    vendorId: string
    createdAt?: Date | string
    read?: boolean
  }

  export type HelicopterForCharterMessagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterForCharterMessagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterForCharterMessagesCreateManyInput = {
    id?: string
    customerName: string
    customerEmail: string
    customerCountry?: string | null
    departureLocation: string
    arrivalLocation: string
    departureDate: Date | string
    returnDate?: Date | string | null
    passengerCount: number
    specialRequests?: string | null
    listingId: string
    vendorId: string
    createdAt?: Date | string
    read?: boolean
  }

  export type HelicopterForCharterMessagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HelicopterForCharterMessagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerCountry?: NullableStringFieldUpdateOperationsInput | string | null
    departureLocation?: StringFieldUpdateOperationsInput | string
    arrivalLocation?: StringFieldUpdateOperationsInput | string
    departureDate?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passengerCount?: IntFieldUpdateOperationsInput | number
    specialRequests?: NullableStringFieldUpdateOperationsInput | string | null
    listingId?: StringFieldUpdateOperationsInput | string
    vendorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    read?: BoolFieldUpdateOperationsInput | boolean
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
    end_date?: SortOrder
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
    end_date?: SortOrder
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
    end_date?: SortOrder
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

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type JetForCharterMessagesCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForCharterMessagesAvgOrderByAggregateInput = {
    passengerCount?: SortOrder
  }

  export type JetForCharterMessagesMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForCharterMessagesMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type JetForCharterMessagesSumOrderByAggregateInput = {
    passengerCount?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type CabinFeatureListRelationFilter = {
    every?: CabinFeatureWhereInput
    some?: CabinFeatureWhereInput
    none?: CabinFeatureWhereInput
  }

  export type CabinFeatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HelicopterForSaleListingCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    helicopterName?: SortOrder
    helicopterType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    serialNumber?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    condition?: SortOrder
    totalFlightHours?: SortOrder
    maintenanceHistory?: SortOrder
    lastInspection?: SortOrder
    salePrice?: SortOrder
    discounts?: SortOrder
    avionics?: SortOrder
    emergencyEquipment?: SortOrder
    cargoHook?: SortOrder
    videoLink?: SortOrder
    exteriorImageUrls?: SortOrder
    interiorImageUrls?: SortOrder
    additionalEquipment?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForSaleListingAvgOrderByAggregateInput = {
    yearOfManufacture?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    totalFlightHours?: SortOrder
    salePrice?: SortOrder
    views?: SortOrder
  }

  export type HelicopterForSaleListingMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    helicopterName?: SortOrder
    helicopterType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    serialNumber?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    condition?: SortOrder
    totalFlightHours?: SortOrder
    maintenanceHistory?: SortOrder
    lastInspection?: SortOrder
    salePrice?: SortOrder
    discounts?: SortOrder
    avionics?: SortOrder
    emergencyEquipment?: SortOrder
    cargoHook?: SortOrder
    videoLink?: SortOrder
    additionalEquipment?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForSaleListingMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    helicopterName?: SortOrder
    helicopterType?: SortOrder
    manufacturer?: SortOrder
    yearOfManufacture?: SortOrder
    registrationNumber?: SortOrder
    serialNumber?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    baggageCapacity?: SortOrder
    condition?: SortOrder
    totalFlightHours?: SortOrder
    maintenanceHistory?: SortOrder
    lastInspection?: SortOrder
    salePrice?: SortOrder
    discounts?: SortOrder
    avionics?: SortOrder
    emergencyEquipment?: SortOrder
    cargoHook?: SortOrder
    videoLink?: SortOrder
    additionalEquipment?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    views?: SortOrder
    status?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForSaleListingSumOrderByAggregateInput = {
    yearOfManufacture?: SortOrder
    seatingCapacity?: SortOrder
    maximumRange?: SortOrder
    cruisingSpeed?: SortOrder
    totalFlightHours?: SortOrder
    salePrice?: SortOrder
    views?: SortOrder
  }

  export type HelicopterForSaleListingListRelationFilter = {
    every?: HelicopterForSaleListingWhereInput
    some?: HelicopterForSaleListingWhereInput
    none?: HelicopterForSaleListingWhereInput
  }

  export type HelicopterForSaleListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CabinFeatureCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type CabinFeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type CabinFeatureMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
  }

  export type HelicopterMessageCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    read?: SortOrder
  }

  export type HelicopterMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    read?: SortOrder
  }

  export type HelicopterMessageMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    message?: SortOrder
    read?: SortOrder
  }

  export type HelicopterForCharterCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: SortOrder
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    location?: SortOrder
    availableFrom?: SortOrder
    availableTo?: SortOrder
    description?: SortOrder
    registrationNumber?: SortOrder
    engineType?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrder
    lastOverhaul?: SortOrder
    airworthinessCertificate?: SortOrder
    lastMaintenanceDate?: SortOrder
    insuranceStatus?: SortOrder
    pilotQualifications?: SortOrder
    safetyFeatures?: SortOrder
    hasWifi?: SortOrder
    hasRefreshments?: SortOrder
    hasEntertainmentSystem?: SortOrder
    hasClimatControl?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    cancellationPolicy?: SortOrder
    packageDeals?: SortOrder
    imageUrls?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    status?: SortOrder
    views?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForCharterAvgOrderByAggregateInput = {
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    views?: SortOrder
  }

  export type HelicopterForCharterMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: SortOrder
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    location?: SortOrder
    availableFrom?: SortOrder
    availableTo?: SortOrder
    description?: SortOrder
    registrationNumber?: SortOrder
    engineType?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrder
    lastOverhaul?: SortOrder
    airworthinessCertificate?: SortOrder
    lastMaintenanceDate?: SortOrder
    insuranceStatus?: SortOrder
    pilotQualifications?: SortOrder
    hasWifi?: SortOrder
    hasRefreshments?: SortOrder
    hasEntertainmentSystem?: SortOrder
    hasClimatControl?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    cancellationPolicy?: SortOrder
    packageDeals?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    status?: SortOrder
    views?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForCharterMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: SortOrder
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    location?: SortOrder
    availableFrom?: SortOrder
    availableTo?: SortOrder
    description?: SortOrder
    registrationNumber?: SortOrder
    engineType?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrder
    lastOverhaul?: SortOrder
    airworthinessCertificate?: SortOrder
    lastMaintenanceDate?: SortOrder
    insuranceStatus?: SortOrder
    pilotQualifications?: SortOrder
    hasWifi?: SortOrder
    hasRefreshments?: SortOrder
    hasEntertainmentSystem?: SortOrder
    hasClimatControl?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    cancellationPolicy?: SortOrder
    packageDeals?: SortOrder
    transactionSignature?: SortOrder
    transactionLink?: SortOrder
    vendorId?: SortOrder
    status?: SortOrder
    views?: SortOrder
    sponsored?: SortOrder
    sponsoredType?: SortOrder
    endDate?: SortOrder
  }

  export type HelicopterForCharterSumOrderByAggregateInput = {
    year?: SortOrder
    capacity?: SortOrder
    range?: SortOrder
    pricePerHour?: SortOrder
    engineCount?: SortOrder
    maxSpeed?: SortOrder
    cruisingSpeed?: SortOrder
    fuelCapacity?: SortOrder
    maxAltitude?: SortOrder
    flightHours?: SortOrder
    depositAmount?: SortOrder
    minimumHours?: SortOrder
    views?: SortOrder
  }

  export type HelicopterForCharterMessagesCountOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type HelicopterForCharterMessagesAvgOrderByAggregateInput = {
    passengerCount?: SortOrder
  }

  export type HelicopterForCharterMessagesMaxOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type HelicopterForCharterMessagesMinOrderByAggregateInput = {
    id?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    customerCountry?: SortOrder
    departureLocation?: SortOrder
    arrivalLocation?: SortOrder
    departureDate?: SortOrder
    returnDate?: SortOrder
    passengerCount?: SortOrder
    specialRequests?: SortOrder
    listingId?: SortOrder
    vendorId?: SortOrder
    createdAt?: SortOrder
    read?: SortOrder
  }

  export type HelicopterForCharterMessagesSumOrderByAggregateInput = {
    passengerCount?: SortOrder
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type HelicopterForSaleListingCreateexteriorImageUrlsInput = {
    set: string[]
  }

  export type HelicopterForSaleListingCreateinteriorImageUrlsInput = {
    set: string[]
  }

  export type CabinFeatureCreateNestedManyWithoutHelicoptersInput = {
    create?: XOR<CabinFeatureCreateWithoutHelicoptersInput, CabinFeatureUncheckedCreateWithoutHelicoptersInput> | CabinFeatureCreateWithoutHelicoptersInput[] | CabinFeatureUncheckedCreateWithoutHelicoptersInput[]
    connectOrCreate?: CabinFeatureCreateOrConnectWithoutHelicoptersInput | CabinFeatureCreateOrConnectWithoutHelicoptersInput[]
    connect?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
  }

  export type CabinFeatureUncheckedCreateNestedManyWithoutHelicoptersInput = {
    create?: XOR<CabinFeatureCreateWithoutHelicoptersInput, CabinFeatureUncheckedCreateWithoutHelicoptersInput> | CabinFeatureCreateWithoutHelicoptersInput[] | CabinFeatureUncheckedCreateWithoutHelicoptersInput[]
    connectOrCreate?: CabinFeatureCreateOrConnectWithoutHelicoptersInput | CabinFeatureCreateOrConnectWithoutHelicoptersInput[]
    connect?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
  }

  export type HelicopterForSaleListingUpdateexteriorImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type HelicopterForSaleListingUpdateinteriorImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CabinFeatureUpdateManyWithoutHelicoptersNestedInput = {
    create?: XOR<CabinFeatureCreateWithoutHelicoptersInput, CabinFeatureUncheckedCreateWithoutHelicoptersInput> | CabinFeatureCreateWithoutHelicoptersInput[] | CabinFeatureUncheckedCreateWithoutHelicoptersInput[]
    connectOrCreate?: CabinFeatureCreateOrConnectWithoutHelicoptersInput | CabinFeatureCreateOrConnectWithoutHelicoptersInput[]
    upsert?: CabinFeatureUpsertWithWhereUniqueWithoutHelicoptersInput | CabinFeatureUpsertWithWhereUniqueWithoutHelicoptersInput[]
    set?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    disconnect?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    delete?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    connect?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    update?: CabinFeatureUpdateWithWhereUniqueWithoutHelicoptersInput | CabinFeatureUpdateWithWhereUniqueWithoutHelicoptersInput[]
    updateMany?: CabinFeatureUpdateManyWithWhereWithoutHelicoptersInput | CabinFeatureUpdateManyWithWhereWithoutHelicoptersInput[]
    deleteMany?: CabinFeatureScalarWhereInput | CabinFeatureScalarWhereInput[]
  }

  export type CabinFeatureUncheckedUpdateManyWithoutHelicoptersNestedInput = {
    create?: XOR<CabinFeatureCreateWithoutHelicoptersInput, CabinFeatureUncheckedCreateWithoutHelicoptersInput> | CabinFeatureCreateWithoutHelicoptersInput[] | CabinFeatureUncheckedCreateWithoutHelicoptersInput[]
    connectOrCreate?: CabinFeatureCreateOrConnectWithoutHelicoptersInput | CabinFeatureCreateOrConnectWithoutHelicoptersInput[]
    upsert?: CabinFeatureUpsertWithWhereUniqueWithoutHelicoptersInput | CabinFeatureUpsertWithWhereUniqueWithoutHelicoptersInput[]
    set?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    disconnect?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    delete?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    connect?: CabinFeatureWhereUniqueInput | CabinFeatureWhereUniqueInput[]
    update?: CabinFeatureUpdateWithWhereUniqueWithoutHelicoptersInput | CabinFeatureUpdateWithWhereUniqueWithoutHelicoptersInput[]
    updateMany?: CabinFeatureUpdateManyWithWhereWithoutHelicoptersInput | CabinFeatureUpdateManyWithWhereWithoutHelicoptersInput[]
    deleteMany?: CabinFeatureScalarWhereInput | CabinFeatureScalarWhereInput[]
  }

  export type HelicopterForSaleListingCreateNestedManyWithoutCabinFeaturesInput = {
    create?: XOR<HelicopterForSaleListingCreateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput> | HelicopterForSaleListingCreateWithoutCabinFeaturesInput[] | HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput[]
    connectOrCreate?: HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput | HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput[]
    connect?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
  }

  export type HelicopterForSaleListingUncheckedCreateNestedManyWithoutCabinFeaturesInput = {
    create?: XOR<HelicopterForSaleListingCreateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput> | HelicopterForSaleListingCreateWithoutCabinFeaturesInput[] | HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput[]
    connectOrCreate?: HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput | HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput[]
    connect?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
  }

  export type HelicopterForSaleListingUpdateManyWithoutCabinFeaturesNestedInput = {
    create?: XOR<HelicopterForSaleListingCreateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput> | HelicopterForSaleListingCreateWithoutCabinFeaturesInput[] | HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput[]
    connectOrCreate?: HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput | HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput[]
    upsert?: HelicopterForSaleListingUpsertWithWhereUniqueWithoutCabinFeaturesInput | HelicopterForSaleListingUpsertWithWhereUniqueWithoutCabinFeaturesInput[]
    set?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    disconnect?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    delete?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    connect?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    update?: HelicopterForSaleListingUpdateWithWhereUniqueWithoutCabinFeaturesInput | HelicopterForSaleListingUpdateWithWhereUniqueWithoutCabinFeaturesInput[]
    updateMany?: HelicopterForSaleListingUpdateManyWithWhereWithoutCabinFeaturesInput | HelicopterForSaleListingUpdateManyWithWhereWithoutCabinFeaturesInput[]
    deleteMany?: HelicopterForSaleListingScalarWhereInput | HelicopterForSaleListingScalarWhereInput[]
  }

  export type HelicopterForSaleListingUncheckedUpdateManyWithoutCabinFeaturesNestedInput = {
    create?: XOR<HelicopterForSaleListingCreateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput> | HelicopterForSaleListingCreateWithoutCabinFeaturesInput[] | HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput[]
    connectOrCreate?: HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput | HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput[]
    upsert?: HelicopterForSaleListingUpsertWithWhereUniqueWithoutCabinFeaturesInput | HelicopterForSaleListingUpsertWithWhereUniqueWithoutCabinFeaturesInput[]
    set?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    disconnect?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    delete?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    connect?: HelicopterForSaleListingWhereUniqueInput | HelicopterForSaleListingWhereUniqueInput[]
    update?: HelicopterForSaleListingUpdateWithWhereUniqueWithoutCabinFeaturesInput | HelicopterForSaleListingUpdateWithWhereUniqueWithoutCabinFeaturesInput[]
    updateMany?: HelicopterForSaleListingUpdateManyWithWhereWithoutCabinFeaturesInput | HelicopterForSaleListingUpdateManyWithWhereWithoutCabinFeaturesInput[]
    deleteMany?: HelicopterForSaleListingScalarWhereInput | HelicopterForSaleListingScalarWhereInput[]
  }

  export type HelicopterForCharterCreatesafetyFeaturesInput = {
    set: string[]
  }

  export type HelicopterForCharterCreateimageUrlsInput = {
    set: string[]
  }

  export type HelicopterForCharterUpdatesafetyFeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type HelicopterForCharterUpdateimageUrlsInput = {
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

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CabinFeatureCreateWithoutHelicoptersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type CabinFeatureUncheckedCreateWithoutHelicoptersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
  }

  export type CabinFeatureCreateOrConnectWithoutHelicoptersInput = {
    where: CabinFeatureWhereUniqueInput
    create: XOR<CabinFeatureCreateWithoutHelicoptersInput, CabinFeatureUncheckedCreateWithoutHelicoptersInput>
  }

  export type CabinFeatureUpsertWithWhereUniqueWithoutHelicoptersInput = {
    where: CabinFeatureWhereUniqueInput
    update: XOR<CabinFeatureUpdateWithoutHelicoptersInput, CabinFeatureUncheckedUpdateWithoutHelicoptersInput>
    create: XOR<CabinFeatureCreateWithoutHelicoptersInput, CabinFeatureUncheckedCreateWithoutHelicoptersInput>
  }

  export type CabinFeatureUpdateWithWhereUniqueWithoutHelicoptersInput = {
    where: CabinFeatureWhereUniqueInput
    data: XOR<CabinFeatureUpdateWithoutHelicoptersInput, CabinFeatureUncheckedUpdateWithoutHelicoptersInput>
  }

  export type CabinFeatureUpdateManyWithWhereWithoutHelicoptersInput = {
    where: CabinFeatureScalarWhereInput
    data: XOR<CabinFeatureUpdateManyMutationInput, CabinFeatureUncheckedUpdateManyWithoutHelicoptersInput>
  }

  export type CabinFeatureScalarWhereInput = {
    AND?: CabinFeatureScalarWhereInput | CabinFeatureScalarWhereInput[]
    OR?: CabinFeatureScalarWhereInput[]
    NOT?: CabinFeatureScalarWhereInput | CabinFeatureScalarWhereInput[]
    id?: UuidFilter<"CabinFeature"> | string
    createdAt?: DateTimeFilter<"CabinFeature"> | Date | string
    updatedAt?: DateTimeFilter<"CabinFeature"> | Date | string
    name?: StringFilter<"CabinFeature"> | string
  }

  export type HelicopterForSaleListingCreateWithoutCabinFeaturesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    helicopterName: string
    helicopterType: string
    manufacturer: string
    yearOfManufacture: number
    registrationNumber: string
    serialNumber: string
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: string
    condition: string
    totalFlightHours: number
    maintenanceHistory: string
    lastInspection: Date | string
    salePrice: number
    discounts?: string | null
    avionics?: string | null
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: string | null
    exteriorImageUrls?: HelicopterForSaleListingCreateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingCreateinteriorImageUrlsInput | string[]
    additionalEquipment?: string | null
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
  }

  export type HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    helicopterName: string
    helicopterType: string
    manufacturer: string
    yearOfManufacture: number
    registrationNumber: string
    serialNumber: string
    seatingCapacity: number
    maximumRange: number
    cruisingSpeed: number
    baggageCapacity: string
    condition: string
    totalFlightHours: number
    maintenanceHistory: string
    lastInspection: Date | string
    salePrice: number
    discounts?: string | null
    avionics?: string | null
    emergencyEquipment?: boolean
    cargoHook?: boolean
    videoLink?: string | null
    exteriorImageUrls?: HelicopterForSaleListingCreateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingCreateinteriorImageUrlsInput | string[]
    additionalEquipment?: string | null
    transactionSignature: string
    transactionLink?: string | null
    vendorId: string
    views?: number
    status?: string
    sponsored?: boolean
    sponsoredType?: string
    endDate?: Date | string
  }

  export type HelicopterForSaleListingCreateOrConnectWithoutCabinFeaturesInput = {
    where: HelicopterForSaleListingWhereUniqueInput
    create: XOR<HelicopterForSaleListingCreateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput>
  }

  export type HelicopterForSaleListingUpsertWithWhereUniqueWithoutCabinFeaturesInput = {
    where: HelicopterForSaleListingWhereUniqueInput
    update: XOR<HelicopterForSaleListingUpdateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedUpdateWithoutCabinFeaturesInput>
    create: XOR<HelicopterForSaleListingCreateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedCreateWithoutCabinFeaturesInput>
  }

  export type HelicopterForSaleListingUpdateWithWhereUniqueWithoutCabinFeaturesInput = {
    where: HelicopterForSaleListingWhereUniqueInput
    data: XOR<HelicopterForSaleListingUpdateWithoutCabinFeaturesInput, HelicopterForSaleListingUncheckedUpdateWithoutCabinFeaturesInput>
  }

  export type HelicopterForSaleListingUpdateManyWithWhereWithoutCabinFeaturesInput = {
    where: HelicopterForSaleListingScalarWhereInput
    data: XOR<HelicopterForSaleListingUpdateManyMutationInput, HelicopterForSaleListingUncheckedUpdateManyWithoutCabinFeaturesInput>
  }

  export type HelicopterForSaleListingScalarWhereInput = {
    AND?: HelicopterForSaleListingScalarWhereInput | HelicopterForSaleListingScalarWhereInput[]
    OR?: HelicopterForSaleListingScalarWhereInput[]
    NOT?: HelicopterForSaleListingScalarWhereInput | HelicopterForSaleListingScalarWhereInput[]
    id?: UuidFilter<"HelicopterForSaleListing"> | string
    createdAt?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    updatedAt?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    helicopterName?: StringFilter<"HelicopterForSaleListing"> | string
    helicopterType?: StringFilter<"HelicopterForSaleListing"> | string
    manufacturer?: StringFilter<"HelicopterForSaleListing"> | string
    yearOfManufacture?: IntFilter<"HelicopterForSaleListing"> | number
    registrationNumber?: StringFilter<"HelicopterForSaleListing"> | string
    serialNumber?: StringFilter<"HelicopterForSaleListing"> | string
    seatingCapacity?: IntFilter<"HelicopterForSaleListing"> | number
    maximumRange?: FloatFilter<"HelicopterForSaleListing"> | number
    cruisingSpeed?: FloatFilter<"HelicopterForSaleListing"> | number
    baggageCapacity?: StringFilter<"HelicopterForSaleListing"> | string
    condition?: StringFilter<"HelicopterForSaleListing"> | string
    totalFlightHours?: FloatFilter<"HelicopterForSaleListing"> | number
    maintenanceHistory?: StringFilter<"HelicopterForSaleListing"> | string
    lastInspection?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
    salePrice?: FloatFilter<"HelicopterForSaleListing"> | number
    discounts?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    avionics?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    emergencyEquipment?: BoolFilter<"HelicopterForSaleListing"> | boolean
    cargoHook?: BoolFilter<"HelicopterForSaleListing"> | boolean
    videoLink?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    exteriorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    interiorImageUrls?: StringNullableListFilter<"HelicopterForSaleListing">
    additionalEquipment?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    transactionSignature?: StringFilter<"HelicopterForSaleListing"> | string
    transactionLink?: StringNullableFilter<"HelicopterForSaleListing"> | string | null
    vendorId?: UuidFilter<"HelicopterForSaleListing"> | string
    views?: IntFilter<"HelicopterForSaleListing"> | number
    status?: StringFilter<"HelicopterForSaleListing"> | string
    sponsored?: BoolFilter<"HelicopterForSaleListing"> | boolean
    sponsoredType?: StringFilter<"HelicopterForSaleListing"> | string
    endDate?: DateTimeFilter<"HelicopterForSaleListing"> | Date | string
  }

  export type CabinFeatureUpdateWithoutHelicoptersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CabinFeatureUncheckedUpdateWithoutHelicoptersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CabinFeatureUncheckedUpdateManyWithoutHelicoptersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type HelicopterForSaleListingUpdateWithoutCabinFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForSaleListingUncheckedUpdateWithoutCabinFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HelicopterForSaleListingUncheckedUpdateManyWithoutCabinFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    helicopterName?: StringFieldUpdateOperationsInput | string
    helicopterType?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    yearOfManufacture?: IntFieldUpdateOperationsInput | number
    registrationNumber?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    seatingCapacity?: IntFieldUpdateOperationsInput | number
    maximumRange?: FloatFieldUpdateOperationsInput | number
    cruisingSpeed?: FloatFieldUpdateOperationsInput | number
    baggageCapacity?: StringFieldUpdateOperationsInput | string
    condition?: StringFieldUpdateOperationsInput | string
    totalFlightHours?: FloatFieldUpdateOperationsInput | number
    maintenanceHistory?: StringFieldUpdateOperationsInput | string
    lastInspection?: DateTimeFieldUpdateOperationsInput | Date | string
    salePrice?: FloatFieldUpdateOperationsInput | number
    discounts?: NullableStringFieldUpdateOperationsInput | string | null
    avionics?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyEquipment?: BoolFieldUpdateOperationsInput | boolean
    cargoHook?: BoolFieldUpdateOperationsInput | boolean
    videoLink?: NullableStringFieldUpdateOperationsInput | string | null
    exteriorImageUrls?: HelicopterForSaleListingUpdateexteriorImageUrlsInput | string[]
    interiorImageUrls?: HelicopterForSaleListingUpdateinteriorImageUrlsInput | string[]
    additionalEquipment?: NullableStringFieldUpdateOperationsInput | string | null
    transactionSignature?: StringFieldUpdateOperationsInput | string
    transactionLink?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sponsored?: BoolFieldUpdateOperationsInput | boolean
    sponsoredType?: StringFieldUpdateOperationsInput | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
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