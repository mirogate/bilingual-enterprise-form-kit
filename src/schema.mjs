export const schema = {
  locales: {
    en: {
      dir: 'ltr',
      submit: 'Send request',
      success: 'Request received. The team will respond after review.',
      errors: {
        required: 'This field is required.',
        email: 'Enter a valid email address.',
        minLength: 'Enter at least {min} characters.',
      },
    },
    ar: {
      dir: 'rtl',
      submit: 'إرسال الطلب',
      success: 'تم استلام الطلب. سيراجعه الفريق ثم يرد عليك.',
      errors: {
        required: 'هذا الحقل مطلوب.',
        email: 'أدخل بريدًا إلكترونيًا صحيحًا.',
        minLength: 'أدخل {min} أحرف على الأقل.',
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      labels: {
        en: 'Name',
        ar: 'الاسم',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      labels: {
        en: 'Email',
        ar: 'البريد الإلكتروني',
      },
    },
    {
      name: 'organization',
      type: 'text',
      required: false,
      labels: {
        en: 'Organization',
        ar: 'الجهة',
      },
    },
    {
      name: 'brief',
      type: 'textarea',
      required: true,
      minLength: 20,
      labels: {
        en: 'Brief',
        ar: 'وصف الطلب',
      },
    },
  ],
}
