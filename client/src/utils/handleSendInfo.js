export const handleSendInfoes = async(e, toHook) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {};

      formData.forEach((value, key) => {
            data[key] = value;
      });

      toHook(data)
};