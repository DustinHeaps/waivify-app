// components/template/SaveBar.tsx
import { AnimatePresence, motion } from "framer-motion";

export default function SaveBar({ formError, formSuccess, handleSave, isSaving }: any) {
  return (
    <div>
      <AnimatePresence>
        {formError && (
          <motion.p
            key='form-error'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='text-sm text-red-500 mb-2 text-center'
          >
            {formError}
          </motion.p>
        )}
        {formSuccess && (
          <motion.p
            key='form-success'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='text-sm text-green-600 mb-2 text-center'
          >
            ✅ Template saved successfully!
          </motion.p>
        )}
      </AnimatePresence>
      <button
        type='button'
        onClick={handleSave}
        disabled={isSaving}
        className='w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-sm disabled:opacity-50'
      >
        {isSaving ? "Saving..." : "Save Template"}
      </button>
    </div>
  );
}
