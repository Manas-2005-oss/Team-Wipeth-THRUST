def apply_trade(GDP, inputs):
    """
    External sector model with realistic tariff effects
    """

    tariff = getattr(inputs, "tariffRate", 0)

    # Trade shares
    export_share = 0.21
    import_share = 0.24

    exports = GDP * export_share
    imports = GDP * import_share

    # Tariffs reduce imports moderately
    imports = imports * (1 - 0.4 * tariff)

    # Tariffs slightly affect exports
    exports = exports * (1 + 0.05 * tariff)

    # Safety checks
    exports = max(exports, 0.01)
    imports = max(imports, 0.01)

    trade_balance = exports - imports

    # Trade contribution to GDP
    GDP_adjusted = GDP + 0.12 * trade_balance

    GDP_adjusted = max(GDP_adjusted, 0.1)

    return GDP_adjusted, exports, imports, trade_balance