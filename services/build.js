exports.available_commands = {};

exports.register_command = (init, func) => {
  exports.available_commands[init] = {
    'func':func
  };
};
