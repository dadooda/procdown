
import { fromMeta, path } from "../deps.ts"

export * as bm from "./bm.ts"
export * as d from "./d.ts"
export * as h from "./h.ts"
export * as m from "./m.ts"
export * as p from "./p.ts"

const { __dirname } = fromMeta(import.meta)

export const contentPname = path.join(__dirname, "content")
