/* This file is part of natlib.
 * natlib, a library for games, is planned to release in early 2021.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

interface IVec2 {
    x: number
    y: number
}

/** A 2D vector. */
class NVec2 implements IVec2 {
    x: number
    y: number

    /** Create a new vector. */
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    /** Set the `x` and `y` components of this vector. */
    set(x: number, y: number) {
        this.x = x
        this.y = y
    }

    /** Copy the values of the other vector's `x` and `y` properties to this vector. */
    setTo(other: IVec2) {
        this.x = other.x
        this.y = other.y
    }

    /** Compute the Euclidean length of this vector. */
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /** Compute the squared distance from this vector to the other one. */
    distanceSquared(other: IVec2): number {
        const x = this.x - other.x
        const y = this.y - other.y
        return x * x + y * y
    }

    /** Add the other vector to this one. */
    add(other: IVec2) {
        this.x += other.x
        this.y += other.y
    }

    /** Subtract the other vector from this one. */
    subtract(other: IVec2) {
        this.x -= other.x
        this.y -= other.y
    }

    /** Set this vector to `a` − `b`. */
    setSubtract(a: IVec2, b: IVec2) {
        this.x = a.x - b.x
        this.y = a.y - b.y
    }

    /** Compute the dot product of this vector and the other one. */
    dot(other: IVec2): number {
        return this.x * other.x + this.y * other.y
    }

    /** Multiply this vector by the scalar `a`. */
    scalarMult(a: number) {
        this.x *= a
        this.y *= a
    }

    /** Set this vector to the multiple of the other vector by the scalar `a`. */
    setScalarMult(other: IVec2, a: number) {
        this.x = other.x * a
        this.y = other.y * a
    }

    /** Set this vector to the normal to the edge `ab`. */
    setNormal(a: IVec2, b: IVec2) {
        // perpendicular
        this.x = a.y - b.y
        this.y = b.x - a.x

        // normalize
        const length = this.length()
        if (length < Number.MIN_VALUE) return
        this.scalarMult(1 / length)
    }
}
