abstract class Immutable<T> {
    update(updates : Partial<T>): this {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), { ...this, ...updates});
    }
}

export default Immutable;