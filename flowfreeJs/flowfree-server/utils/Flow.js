let HashSet = function (_set) {
    this.set = _set == null ? {} : _set;
    this.add = function (key) {
        this.set.key = true;
    }
    this.remove = function (key) {
        this.set.remove(key);
    }
    this.contains = (key) => (this.set[key] == true);
}

